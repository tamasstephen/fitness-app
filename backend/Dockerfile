FROM alpine:3.18.4

WORKDIR /app

RUN apk add --no-cache \
    python3 \
    py3-pip \
    postgresql-dev \
    python3-dev \
    musl-dev \
    gcc

RUN python -m venv venv
ENV PATH="/app/venv/bin:$PATH"

COPY . .

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 5000

CMD ["python", "-m", "src.app"]