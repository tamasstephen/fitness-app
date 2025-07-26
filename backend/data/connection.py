import psycopg2
import os
from functools import wraps
from psycopg2 import pool
from psycopg2.extras import RealDictCursor

password = os.getenv("POSTGRES_PASSWORD")
host = os.getenv("POSTGRES_HOST")
database = os.getenv("POSTGRES_DB")
user = os.getenv("POSTGRES_USER")

MIN_CONNECTIONS = 1
MAX_CONNECTIONS = 10


def create_connection_pool():
    connection_pool = pool.SimpleConnectionPool(
        minconn=MIN_CONNECTIONS,
        maxconn=MAX_CONNECTIONS,
        host=host,
        database=database,
        user=user,
        password=password,
    )
    return connection_pool


connection_pool = create_connection_pool()


def with_connection(func):
    @wraps(func)
    def connection_handler(*args, **kwargs):
        conn = connection_pool.getconn()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        try:
            data = func(cursor, *args, **kwargs)
            conn.commit()
            return data
        except psycopg2.Error as e:
            conn.rollback()
            raise e
        finally:
            cursor.close()
            connection_pool.putconn(conn)

    return connection_handler
