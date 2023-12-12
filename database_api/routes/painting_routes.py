from flask import Blueprint, jsonify, request
from psycopg2.extras import RealDictCursor 

from ..database import create_db_connection

painting_bp = Blueprint("painting_routes", __name__)

@painting_bp.route("/paintings", methods=['GET'])
def get_paintings():
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
        query += " AND name = %s"
        params.append(name)

    try:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute(query, params)
            paintings = cur.fetchall()
        
        return jsonify(paintings)
    
    finally:
        conn.close()

@painting_bp.route("/painting/<int:painting_id>/products", methods=['GET'])
def get_painting_products(painting_id):
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
