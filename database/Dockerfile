# Use an official PostgreSQL image as the base image
FROM postgres:16.1

# Set environment variables (override at runtime)
ENV POSTGRES_DB=""
ENV POSTGRES_USER=""
ENV POSTGRES_PASSWORD=""

# Copy DB init scripts (scripts are only executed the first time the container is started)
COPY ./src/sql/ /docker-entrypoint-initdb.d/
