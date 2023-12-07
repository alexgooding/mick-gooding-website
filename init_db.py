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
# Insert data into tables
with open("resources/canvas_stock.csv", newline='') as csvf:
    reader = csv.DictReader(csvf)
    for row in reader:
        cur.execute("INSERT INTO paintings (painting_id, artist, description)"
                    "VALUES (%s, %s, %s)",
                    (row['Stock Number'],
                    row['Artist'],
                    "")
                )
        cur.execute("INSERT INTO products (painting_id, product_type, price, stock)"
                    "VALUES (%s, %s, %s, %s)",
                    (row['Stock Number'],
                    "Canvas Print",
                    CANVAS_PRINT_PRICE,
                    row['Stock'] if row['Stock'] else None)
                )

# Close database connection
conn.commit()
cur.close()
conn.close()
