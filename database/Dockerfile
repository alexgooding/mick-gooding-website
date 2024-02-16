# Use an official PostgreSQL image as the base image
FROM postgres:16.1

# Set environment variables
ENV POSTGRES_DB=flask_db
ENV POSTGRES_USER=admin
ENV POSTGRES_PASSWORD=admin

# Copy DB init scripts
COPY ./src/sql/ /docker-entrypoint-initdb.d/
