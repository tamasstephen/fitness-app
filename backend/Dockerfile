FROM alpine:3.18.4

WORKDIR /app

COPY . .

# Install Python and build dependencies
RUN apk add --no-cache \
    python3 \
    py-pip \
    postgresql-dev \
    python3-dev \
    build-base

# Create and activate virtual environment
RUN python3 -m venv venv
ENV PATH="/app/venv/bin:$PATH"

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 5000

CMD ["python", "src/app.py"]