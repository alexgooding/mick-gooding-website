import csv
import os
import psycopg2


CANVAS_PRINT_PRICE = 30.00

conn = psycopg2.connect(
    host="localhost",
    port="5432",
    database=os.environ['DB_NAME'],
    user=os.environ['DB_USERNAME'],
    password=os.environ['DB_PASSWORD']
)

cur = conn.cursor()

# Create tables
with open("sql/init.sql", 'r') as f:
    init_sql = f.read()
cur.execute(init_sql)

# Insert data
with open("sql/insert_data.sql", 'r') as f:
    insert_data_sql = f.read()
cur.execute(insert_data_sql)

# Close database connection
conn.commit()
cur.close()
conn.close()
