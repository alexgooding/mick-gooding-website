from flask import jsonify, request
from flask_restx import Namespace, Resource
from psycopg2.extras import RealDictCursor 

from ..auth import create_db_connection


painting_ns = Namespace(__name__)

@painting_ns.route("/paintings")
class Paintings(Resource):
    def get(self):
        conn = create_db_connection()

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

        try:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute(query, params)
                paintings = cur.fetchall()
            
            return jsonify(paintings)
        
        finally:
            conn.close()

@painting_ns.route("/painting/<int:painting_id>/products")
class PaintingProducts(Resource):
    def get(self, painting_id):
        conn = create_db_connection()

        # Construct dynamic SQL query based on the request args
        query = "SELECT * FROM products WHERE painting_id = %s"

        try:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute(query, (painting_id,))
                products = cur.fetchall()
            
            return jsonify(products)
        
        finally:
            conn.close()
