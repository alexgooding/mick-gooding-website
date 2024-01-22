from flask import Blueprint, jsonify, request
import psycopg2
from psycopg2.extras import RealDictCursor 

from ..auth import create_db_connection

product_bp = Blueprint("product_routes", __name__)

@product_bp.route("/products", methods=['GET'])
def get_products():
    conn = create_db_connection()

    # Extract parameters from the request, if they exist
    product_id = request.args.get('product_id')
    painting_id = request.args.get('painting_id')
    product_type = request.args.get('product_type')
    price = request.args.get('price')
    stock = request.args.get('stock')

    # Construct dynamic SQL query based on the request args
    query = "SELECT * FROM products WHERE 1=1"
    params = []

    if product_id:
        query += " AND product_id = %s"
        params.append(product_id)
    if painting_id:
        query += " AND painting_id = %s"
        params.append(painting_id)
    if product_type:
        query += " AND product_type = %s"
        params.append(product_type)
    # Retrieve all products where the price is less than or equal to requested
    if price:
        query += " AND price <= %s"
        params.append(price)
    # Retrieve all products where the stock is greater than or equal to requested  
    if stock:
        query += " AND stock >= %s"
        params.append(stock)
    
    try:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute(query, params)
            products = cur.fetchall()
        
        return jsonify(products)
    
    finally:
        conn.close()

@product_bp.route("/product/<int:product_id>", methods=['GET'])
def get_product(product_id):
    conn = create_db_connection()

    query = """
        SELECT * FROM products 
        WHERE product_id = %s
    """

    try:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute(query, (product_id,))
            product = cur.fetchone()
                
        return jsonify(product)
    
    finally:
        conn.close()

@product_bp.route("/product/<int:product_id>/all-info", methods=['GET'])
def get_all_product_info(product_id):
    conn = create_db_connection()

    query = """
        SELECT product_id, products.painting_id AS painting_id, product_type, 
        price, stock, name, description 
        FROM products 
        JOIN paintings ON products.painting_id = paintings.painting_id 
        WHERE product_id = %s
    """

    try:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute(query, (product_id,))
            product_info = cur.fetchone()
                
        return jsonify(product_info)
    
    finally:
        conn.close()

@product_bp.route("/product/<int:product_id>/update-stock/<int:stock>", methods=['PUT'])
def update_stock(product_id, stock):
    
    conn = create_db_connection()

    query = """
        UPDATE products
        SET stock = %s
        WHERE product_id = %s
    """

    try:
        with conn.cursor() as cur:
            cur.execute(query, (stock, product_id))
        
        conn.commit()

        return jsonify({
            'message': f"Stock updated successfully for product ID {product_id}"
        })
    
    except psycopg2.Error as e:
        return jsonify({
            'error': f"Database error: {e}"
        }), 500
    
    finally:
        conn.close()
