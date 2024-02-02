# Stage 1: Build and test
FROM python:3.11.5 AS builder

WORKDIR /app

# Copy only the necessary files for installing test dependencies
COPY requirements.txt .

# Install test dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire project
COPY . .

# Run tests with pytest
RUN python -m pytest tests

# Stage 2: Create the final image
FROM python:3.11.5

WORKDIR /app

# Copy only the src directory from the builder stage
COPY --from=builder /app/src /app/src

# Copy only the necessary files for installing dependencies
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Set environment variables (override at runtime)
ENV DB_NAME=""
ENV DB_USERNAME=""
ENV DB_PASSWORD=""
ENV PAYPAL_CLIENT_ID=""
ENV PAYPAL_CLIENT_SECRET=""
ENV PAYPAL_CLIENT_MODE=""

# Expose on port 5000 for container to container communication
EXPOSE 5000

# Set the command to run the application
CMD ["python", "src/run_api.py"]

