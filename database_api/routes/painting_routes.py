from flask import Blueprint, jsonify, request
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
        with conn.cursor() as cur:
            cur.execute(query, params)
            paintings = cur.fetchall()
        
        paintings_list = [{'painting_id': painting[0], 'artist': painting[1], 'description': painting[2]} 
                          for painting in paintings]
        
        return jsonify(paintings_list)
    
    finally:
        conn.close()
