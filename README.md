# mick-gooding-website

## Prerequisites
* PostgreSQL is installed, and a suitable database and user have been created
* Python 3.11 and the dependencies from requirements.txt have been installed

## Database Setup
Ensure database name, Postgres username and password are exported as environment variables in the deployment environment. i.e.

```
export DB_NAME=<database_name>
export DB_USERNAME=<postgres_username>
export DB_PASSWORD=<postgres_password>
```

Execute the Python script to initialise the database, and populate it with stock data:

```
python init_db.py
```

Note: An independent Postgres database setup has been chosen, decoupling from the flask backend, in case the database schemas and data have to be managed separately.

## Database API Setup
Ensure database credentials are still available in the environment. Execute the run database API script:

```
python run_database_api.py
```

The API should be available at http://127.0.0.1:5000/api

Note: SQL queries have been chosen in preference to using Python models to keep the backend lightweight and practice SQL query construction. 
