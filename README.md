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


