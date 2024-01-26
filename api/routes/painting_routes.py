from flask import jsonify, request
from flask_restx import Namespace, Resource, abort
from psycopg2.extras import RealDictCursor 

from ..decorators import create_con_handle_exceptions


painting_ns = Namespace(__name__)

@painting_ns.route("/paintings")
class Paintings(Resource):
    @painting_ns.doc(params={'painting_id': "Painting ID", 'name': "Name of the painting (case-insensitive)"})
    @painting_ns.response(200, "Success")
    @painting_ns.response(401, "Invalid database credentials")
    @painting_ns.response(404, "No paintings found")
    @painting_ns.response(500, "Internal Server Error")
    @create_con_handle_exceptions
    def get(self, conn):
        # Extract parameters from the request, if they exist
        painting_id = request.args.get('painting_id')
        name = request.args.get('name')

        # Construct dynamic SQL query based on the request args
        query = "SELECT * FROM paintings WHERE 1=1"
        params = []

        if painting_id:
            query += " AND painting_id = %s"
            params.append(painting_id)
        if name:
            query += " AND name ILIKE %s"  # ILIKE for case-insensitive matching
            params.append(f"%{name}%")

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
