# Stage 1: Build Stage with full Python image
FROM python:3.8 as build-stage

# Set the working directory inside the container
WORKDIR /app

# Copy the requirements.txt file and install dependencies
COPY requirements.txt .
# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . .

# Stage 2: Final Stage using Python slim image
FROM python:3.8-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the installed Python packages from the build stage
COPY --from=build-stage /usr/local/lib/python3.8/site-packages /usr/local/lib/python3.8/site-packages

# Copy the application code from the build stage
COPY --from=build-stage /app /app

# No need to expose port since it's only metadata, but it's good documentation
EXPOSE 8080

# Set the command to run your application
CMD ["python", "app.py"]