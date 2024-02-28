# mick-gooding-website

## Prerequisites

* Docker engine installed

## App Setup

Ensure an environment file has been created with database name, Postgres username, password, PayPal client ID, secret and mode included. For production deployment, ensure absolute paths to an SSL certificate and private key on the host machine are included too.

```
POSTGRES_DB=<database_name>
POSTGRES_USER=<postgres_username>
POSTGRES_PASSWORD=<postgres_password>
PAYPAL_CLIENT_ID=<client_id>
PAYPAL_CLIENT_SECRET=<client_secret>
PAYPAL_CLIENT_MODE=<SANDBOX|PRODUCTION>
SSL_CERT_PATH=<ssl_cert_path>
SSL_PRIVATE_KEY_PATH=<ssl_private_key_path>
```

Start the web services with:

```
docker compose -f compose-<dev|prod>.yml --env-file <path/to/env/file> up -d
```

This will stand up a PostgreSQL database container with a newly created database, using the POSTGRES credentials from the env file. It will standup up a backend API container, written with Flask, to communicate with the database and make requests to the PayPal API. Finally, it will stand up a React UI, for access within a browser.

If a development compose is running, the images and containers corresponding to the services will be build from the src. If production compose is running, it will attempt to pull the latest tagged images corresponding to each service from the Docker registry, before running. If no images exist in the registry, it will fall back on building them from src.

For development builds, the UI should be available at http://localhost:3000. API docs should be available at http://localhost:5000/api/swagger-ui.

For production builds, only the UI should be available at https://localhost:80.

Note: An independent Postgres database setup has been chosen, decoupling from the flask backend, in case the database schemas and data have to be managed separately.

For existing production builds, to pull down the latest tagged version of the web services, run:

```
docker compose -f compose-prod.yaml pull
```

Note: Upon merge with main, Docker images corresponding to each web service will automatically be built and tagged with 'main'. Upon push of a Git tag in the format 'v*', the web service Docker images will be build and tagged with the version number as well as updating the Docker images tagged 'latest'. 
