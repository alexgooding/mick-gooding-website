from flask import Blueprint, jsonify, request
from psycopg2.extras import RealDictCursor 

from ..database import create_db_connection

painting_bp = Blueprint("painting_routes", __name__)

@painting_bp.route("/paintings", methods=['GET'])
def get_paintings():
    conn = create_db_connection()

    # Extract parameters from the request, if they exist
    painting_id = request.args.get('painting_id')
    artist = request.args.get('artist')

    # Construct dynamic SQL query based on the request args
    query = "SELECT * FROM paintings WHERE 1=1"
    params = []

    if painting_id:
        query += " AND painting_id = %s"
        params.append(painting_id)
    if artist:
        query += " AND artist = %s"
        params.append(artist)

    try:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute(query, params)
            paintings = cur.fetchall()
        
        return jsonify(paintings)
    
    finally:
        conn.close()
