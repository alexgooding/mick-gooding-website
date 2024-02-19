# Stage 1: Create base image
FROM python:3.11.5 AS base

WORKDIR /app

# Set environment variables (override at runtime)
ENV POSTGRES_DB=""
ENV POSTGRES_USER=""
ENV POSTGRES_PASSWORD=""
ENV PAYPAL_CLIENT_ID=""
ENV PAYPAL_CLIENT_SECRET=""
ENV PAYPAL_CLIENT_MODE=""

# Stage 2: Create dev image
FROM base as dev

# Copy dev dependencies
COPY ./requirements-dev.txt .

# Install test dependencies
RUN pip install --no-cache-dir -r requirements-dev.txt

# Copy the entire project
COPY . .

# Set the command to run the application
CMD ["python", "src/run_api.py"]

# Stage 3: Create test execution image
FROM dev as test

# Run tests with pytest
RUN python -m pytest tests

# Stage 4: Create the production image
FROM base as prod

# Copy prod dependencies
COPY ./requirements-prod.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements-prod.txt

# Copy only the src directory from the repo
COPY ./src ./src

# Set the command to run the application
CMD ["python", "src/run_api.py"]
