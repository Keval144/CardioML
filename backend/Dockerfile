# Step 1: Base image (Python)
FROM python:3.11-slim

# Step 2: Set working directory inside container
WORKDIR /app

# Step 3: Copy requirements and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Step 4: Copy the application code
COPY ./app ./app

# Step 5: Expose port (FastAPI default)
EXPOSE 8000

# Step 6: Command to run FastAPI
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
