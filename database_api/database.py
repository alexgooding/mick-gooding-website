import os
import psycopg2


def create_db_connection():
    conn = psycopg2.connect(
        host="localhost",
        port="5432",
        database=os.environ['DB_NAME'],
        user=os.environ['DB_USERNAME'],
        password=os.environ['DB_PASSWORD']
    )

    return conn
