# mick-gooding-website

## Prerequisites
* PostgreSQL is installed, and a suitable database and user have been created
* Python 3.11 and the dependencies from requirements.txt have been installed
* Node.js is installed 

## Database Setup
Ensure database name, Postgres username, password, PayPal client ID, secret and mode are exported as environment variables in the deployment environment. i.e.

```
export DB_NAME=<database_name>
export DB_USERNAME=<postgres_username>
export DB_PASSWORD=<postgres_password>
export PAYPAL_CLIENT_ID=<client_id>
export PAYPAL_CLIENT_SECRET=<client_secret>
export PAYPAL_CLIENT_MODE=<SANDBOX|PRODUCTION>
```

Execute the Python script to initialise the database, and populate it with stock data:

```
cd database
python init_db.py
```

Note: An independent Postgres database setup has been chosen, decoupling from the flask backend, in case the database schemas and data have to be managed separately.

## Database API Setup
Ensure database credentials are still available in the environment. Execute the run database API script:

```
python run_api.py
```

The API should be available at http://127.0.0.1:5000/api

Note: SQL queries have been chosen in preference to using Python models to keep the backend lightweight and practice SQL query construction. 

## UI Setup
The front end has been written using React. For first time setup, install the necessary node.js dependencies and start the service using the following code snippet:

```
cd ui
npm install
npm start
```

Note: ommit the `npm install` line beyond first time setup.

The UI should be available at http://127.0.0.1:3000
