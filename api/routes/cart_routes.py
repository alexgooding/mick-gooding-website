from flask import jsonify, request
from flask_restx import Namespace, Resource
from psycopg2.extras import RealDictCursor 
from psycopg2.errors import UniqueViolation 

from ..auth import create_db_connection

cart_ns = Namespace(__name__)

@cart_ns.route("/carts")
class Carts(Resource):
    def get(self):
        conn = create_db_connection()

        query = "SELECT * FROM carts"

        try:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute(query)
                carts = cur.fetchall()
            
            return jsonify(carts)
        
        finally:
            conn.close()

@cart_ns.route("/user/<int:user_id>/cart/create")
class CreateCart(Resource):
    def post(self, user_id):
        conn = create_db_connection()

        query = """
                INSERT INTO carts (user_id)
                VALUES
                    (%s)
            """
        
        try:
            with conn.cursor() as cur:
                cur.execute(query, (user_id,))
            
            conn.commit()
            
            return jsonify({
                'message': f"Cart successfully created for user ID {user_id}"
            })
        
        except UniqueViolation:
            conn.rollback()

            return jsonify({
                'error': f"A cart already exists for user ID {user_id}"
            }), 409
        
        finally:
            conn.close()

@cart_ns.route("/user/<int:user_id>/cart")
class Cart(Resource):
    def get(self, user_id):
        conn = create_db_connection()

        query = "SELECT * FROM carts where user_id = %s"

        try:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute(query, (user_id,))
                cart = cur.fetchone()
            
            return jsonify(cart)
        
        finally:
            conn.close()

@cart_ns.route("/cart/<int:cart_id>/products")
class CartProducts(Resource):
    def get(self, cart_id):
        conn = create_db_connection()

        query = "SELECT * FROM cart_products where cart_id = %s"

        try:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute(query, (cart_id,))
                cart_products = cur.fetchall()
            
            return jsonify(cart_products)
        
        finally:
            conn.close() 

@cart_ns.route("/cart/<int:cart_id>/update-quantity")
class CartProductQuantites(Resource):
    def post(self, cart_id):
        conn = create_db_connection()

        # Retrieve and validate request body parameters
        product_id = request.args.get('product_id')
        quantity = request.args.get('quantity')

        if product_id is None or quantity is None:
            return jsonify({
                'error': "'product_id' or 'quantity' are missing from request body"
            }), 400

        query = """
            INSERT INTO cart_products (cart_id, product_id, quantity)
            VALUES
                (%s, %s, %s)
            ON CONFLICT (cart_id, product_id)
            DO UPDATE SET quantity = EXCLUDED.quantity;
        """

        try:
            with conn.cursor() as cur:
                cur.execute(query, (cart_id, product_id, quantity))

            conn.commit()
            
            return jsonify({
                'message': f"Quantity updated for product ID {product_id} in cart ID {cart_id}"
            })
        
        finally:
            conn.close() 
