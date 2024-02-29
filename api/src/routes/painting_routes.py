from flask import jsonify, request
from flask_restx import Namespace, Resource, abort, reqparse
from psycopg2.extras import RealDictCursor 

from decorators import create_con_handle_exceptions


painting_ns = Namespace(__name__)

@painting_ns.route("/paintings")
class Paintings(Resource):
    @painting_ns.doc(params={
        'painting_id': "Painting ID",
        'name': "Name of the painting (case-insensitive)",
        'order_by': "Column to order by",
        'order': "Order direction (asc/desc)"
    })
    @painting_ns.response(200, "Success")
    @painting_ns.response(400, "Bad request")
    @painting_ns.response(401, "Invalid database credentials")
    @painting_ns.response(404, "No paintings found")
    @painting_ns.response(500, "Internal Server Error")
    @create_con_handle_exceptions
    def get(self, conn):
        # Use reqparse to handle query parameters
        parser = reqparse.RequestParser()
        parser.add_argument('painting_id', type=int)
        parser.add_argument('name', type=str)
        parser.add_argument('order_by', type=str)
        parser.add_argument('order', type=str, choices=('asc', 'desc'), default='asc')

        args = parser.parse_args()

        # Construct dynamic SQL query based on the request args
        query = "SELECT * FROM paintings WHERE 1=1"
        params = []

        if args.painting_id:
            query += " AND painting_id = %s"
            params.append(args.painting_id)
        if args.name:
            query += " AND name ILIKE %s"
            params.append(f"%{args.name}%")

        if args.order_by and args.order:
            query += f" ORDER BY {args.order_by} {args.order}"

        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute(query, params)
            paintings = cur.fetchall()

        if not paintings:
            # Raise 404 error if no paintings are found
            abort(404, message="No paintings found")
        
        return jsonify(paintings)

@painting_ns.route("/painting/<int:painting_id>/products")
class PaintingProducts(Resource):
    @painting_ns.response(200, "Success")
    @painting_ns.response(401, "Invalid database credentials")
    @painting_ns.response(404, "No products found for the specified painting")
    @painting_ns.response(500, "Internal Server Error")
    @create_con_handle_exceptions
    def get(self, painting_id, conn):
        # Construct dynamic SQL query based on the request args
        query = "SELECT * FROM products WHERE painting_id = %s"

        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute(query, (painting_id,))
            products = cur.fetchall()

        if not products:
            # Raise 404 error if no products are found for the specified painting
            abort(404, message="No products found for the specified painting")

        return jsonify(products)
