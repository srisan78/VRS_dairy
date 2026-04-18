# Use Python instead of Node
FROM python:3.10-slim

WORKDIR /app

# Copy the requirements file first to leverage Docker cache
# If you don't have this file yet, see step 2 below
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the backend code (including main.py)
COPY . .

EXPOSE 8000

# Start the Python application
# If using FastAPI/Uvicorn:
CMD ["python", "main.py"]