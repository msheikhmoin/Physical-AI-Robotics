# Use the official lightweight Python image.
# https://hub.docker.com/_/python
FROM python:3.10-slim

# Set the working directory in the container
WORKDIR /app

# Copy the dependencies file to the working directory
COPY requirements.txt .

# Install any dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the backend code into the container
COPY backend/ backend/

# Expose the port that the app will run on
EXPOSE 7860

# Command to run the application
CMD ["gunicorn", "backend.app:app", "-k", "uvicorn.workers.UvicornWorker", "--bind", "0.0.0.0:7860"]
