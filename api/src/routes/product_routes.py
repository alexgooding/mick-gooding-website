from flask import jsonify, request
from flask_restx import Namespace, Resource, abort
from psycopg2.extras import RealDictCursor 

from decorators import create_con_handle_exceptions

product_ns = Namespace(__name__)

@product_ns.route("/products")
class Products(Resource):
    @product_ns.doc(params={'product_id': "Product ID", 'painting_id': "Painting ID", 'product_type': "Product Type", 'price': "Price", 'stock': "Stock"})
    @product_ns.response(200, "Success")
    @product_ns.response(401, "Invalid database credentials")
    @product_ns.response(404, "No products found")
    @product_ns.response(500, "Internal Server Error")
    @create_con_handle_exceptions
    def get(self, conn):

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

        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute(query, params)
            products = cur.fetchall()

        if not products:
            # Raise 404 error if no products are found
            abort(404, message="No products found")

        return jsonify(products)

@product_ns.route("/product/<int:product_id>")
class Product(Resource):
    @product_ns.response(200, "Success")
    @product_ns.response(401, "Invalid database credentials")
    @product_ns.response(404, "Product not found")
    @product_ns.response(500, "Internal Server Error")
    @create_con_handle_exceptions
    def get(self, product_id, conn):
        query = """
            SELECT * FROM products 
            WHERE product_id = %s
        """

        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute(query, (product_id,))
            product = cur.fetchone()

        if not product:
            # Raise 404 error if product is not found
            abort(404, message="Product not found")

        return jsonify(product)

@product_ns.route("/product/<int:product_id>/all-info")
class ProductAllInfo(Resource):
    @product_ns.response(200, "Success")
    @product_ns.response(401, "Invalid database credentials")
    @product_ns.response(404, "Product info not found")
    @product_ns.response(500, "Internal Server Error")
    @create_con_handle_exceptions
    def get(self, product_id, conn):
        query = """
            SELECT product_id, products.painting_id AS painting_id, product_type, 
            price, stock, name, description 
            FROM products 
            JOIN paintings ON products.painting_id = paintings.painting_id 
            WHERE product_id = %s
        """

        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute(query, (product_id,))
            product_info = cur.fetchone()

        if not product_info:
            # Raise 404 error if product info is not found
            abort(404, message="Product info not found")

        return jsonify(product_info)

@product_ns.route("/product/<int:product_id>/update-stock/<int:stock>")
class ProductStock(Resource):
    @product_ns.response(200, "Success")
    @product_ns.response(401, "Invalid database credentials")
    @product_ns.response(500, "Internal Server Error")
    @create_con_handle_exceptions
    def put(self, product_id, stock, conn):
        query = """
            UPDATE products
            SET stock = %s
            WHERE product_id = %s
        """

        with conn.cursor() as cur:
            cur.execute(query, (stock, product_id))

        conn.commit()

        return jsonify({
            'message': f"Stock updated successfully for product ID {product_id}"
        })
