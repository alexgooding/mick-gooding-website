import requests
from flask import jsonify, request, url_for, abort
from flask_restx import Namespace, Resource
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
            abort(404, "No products found")

        return jsonify(products)

@product_ns.route("/product/<int:product_id>")
class Product(Resource):
    @product_ns.response(200, "Success")
    @product_ns.response(401, "Invalid database credentials")
    @product_ns.response(404, "Product not found for product ID '<product_id>'")
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
            abort(404, f"Product not found for product ID '{product_id}'")

        return jsonify(product)

@product_ns.route("/product/<int:product_id>/all-info")
class ProductAllInfo(Resource):
    @product_ns.response(200, "Success")
    @product_ns.response(401, "Invalid database credentials")
    @product_ns.response(404, "Product info not found for product ID '<product_id>'")
    @product_ns.response(500, "Internal Server Error")
    @create_con_handle_exceptions
    def get(self, product_id, conn):
        """
        Combined key info from the paintings and products relating to a particular product
        """
        query = """
            SELECT product_id, products.painting_id AS painting_id, product_type, 
            price, stock, name, paintings.description AS description 
            FROM products 
            JOIN paintings ON products.painting_id = paintings.painting_id 
            WHERE product_id = %s
        """

        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute(query, (product_id,))
            product_info = cur.fetchone()

        if not product_info:
            # Raise 404 error if product info is not found
            abort(404, f"Product info not found for product ID '{product_id}'")

        return jsonify(product_info)

@product_ns.route("/product/<int:product_id>/update-stock/<int:stock>")
class ProductStockUpdate(Resource):
    @product_ns.response(200, "Success")
    @product_ns.response(400, "Missing an order ID corresponding to a completed transaction")
    @product_ns.response(401, "Invalid database credentials")
    @product_ns.response(500, "Internal Server Error")
    @create_con_handle_exceptions
    def put(self, product_id, stock, conn):
        # Verify order exists and is complete before updating stock
        response_json = {}
        order_id = request.json.get('order_id')
        if order_id:
            order_endpoint_url = url_for("routes.paypal_routes_order", order_id=order_id, _external=True)
            response = requests.get(order_endpoint_url)

            response_json = response.json()

        if response_json.get('status') != "COMPLETED":
            abort(400, "Missing an order ID corresponding to a completed transaction")
            
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

@product_ns.route("/product/<int:product_id>/stock")
class ProductStockGet(Resource):
    @product_ns.response(200, "Success")
    @product_ns.response(401, "Invalid database credentials")
    @product_ns.response(404, "Product not found for product ID '<product_id>'")
    @product_ns.response(500, "Internal Server Error")
    @create_con_handle_exceptions
    def get(self, product_id, conn):
        query = """
            SELECT stock FROM products 
            WHERE product_id = %s
        """

        with conn.cursor() as cur:
            cur.execute(query, (product_id,))
            stock = cur.fetchone()

        if not stock:
            # Raise 404 error if product is not found
            abort(404, f"Product not found for product ID '{product_id}'")


        return jsonify(stock[0])
