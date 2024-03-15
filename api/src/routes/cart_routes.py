from flask import jsonify, request, abort
from flask_restx import Namespace, Resource
from psycopg2.extras import RealDictCursor 
from psycopg2.errors import UniqueViolation 

from decorators import create_con_handle_exceptions


cart_ns = Namespace(__name__)

@cart_ns.route("/carts")
class Carts(Resource):
    @cart_ns.response(200, "Success")
    @cart_ns.response(401, "Invalid database credentials")
    @cart_ns.response(500, "Internal Server Error")
    @create_con_handle_exceptions
    def get(self, conn):
        query = "SELECT * FROM carts"

        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute(query)
            carts = cur.fetchall()

        conn.close()
        
        return jsonify(carts)

@cart_ns.route("/user/<int:user_id>/cart/create")
class CreateCart(Resource):
    @cart_ns.response(200, "Success")
    @cart_ns.response(401, "Invalid database credentials")
    @cart_ns.response(409, "Cart already exists for the user")
    @cart_ns.response(500, "Internal Server Error")
    @create_con_handle_exceptions
    def post(self, user_id, conn):
        
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

@cart_ns.route("/user/<int:user_id>/cart")
class Cart(Resource):
    @cart_ns.response(200, "Success")
    @cart_ns.response(401, "Invalid database credentials")
    @cart_ns.response(404, "Cart not found")
    @cart_ns.response(500, "Internal Server Error")
    @create_con_handle_exceptions
    def get(self, user_id, conn):
        
        query = "SELECT * FROM carts where user_id = %s"

        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute(query, (user_id,))
            cart = cur.fetchone()
        
        if not cart:
            abort(404, "Cart not found")

        return jsonify(cart)
        
@cart_ns.route("/cart/<int:cart_id>/products")
class CartProducts(Resource):
    @cart_ns.response(200, "Success")
    @cart_ns.response(401, "Invalid database credentials")
    @cart_ns.response(404, "Cart not found")
    @cart_ns.response(500, "Internal Server Error")
    @create_con_handle_exceptions
    def get(self, cart_id, conn): 
        query = "SELECT * FROM cart_products where cart_id = %s"

        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute(query, (cart_id,))
            cart_products = cur.fetchall()
        
        if not cart_products:
            abort(404, "Cart not found")

        return jsonify(cart_products)

@cart_ns.route("/cart/<int:cart_id>/update-quantity")
class CartProductQuantities(Resource):
    @cart_ns.expect(cart_ns.parser())
    @cart_ns.response(200, "Success")
    @cart_ns.response(400, "'product_id' or 'quantity' missing from request body")
    @cart_ns.response(401, "Invalid database credentials")
    @cart_ns.response(500, "Internal Server Error")
    @create_con_handle_exceptions
    def post(self, cart_id, conn):
        # Retrieve and validate request body parameters
        product_id = request.args.get('product_id')
        quantity = request.args.get('quantity')

        if product_id is None or quantity is None:
            abort(400, "'product_id' or 'quantity' missing from request body")

        query = """
            INSERT INTO cart_products (cart_id, product_id, quantity)
            VALUES
                (%s, %s, %s)
            ON CONFLICT (cart_id, product_id)
            DO UPDATE SET quantity = EXCLUDED.quantity;
        """

        with conn.cursor() as cur:
            cur.execute(query, (cart_id, product_id, quantity))

        conn.commit()
        
        return jsonify({
            'message': f"Quantity updated for product ID {product_id} in cart ID {cart_id}"
        })
