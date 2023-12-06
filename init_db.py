import os
import psycopg2

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
cur.execute("INSERT INTO paintings (painting_id, artist, description)"
            "VALUES (%s, %s, %s)",
            (1,
             "Test Artist",
             "Test Description")
             )

# Close database connection
conn.commit()
cur.close()
conn.close()
