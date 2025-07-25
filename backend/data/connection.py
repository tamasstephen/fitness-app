import psycopg2
import os

password = os.getenv("POSTGRES_PASSWORD")
host = os.getenv("POSTGRES_HOST")
database = os.getenv("POSTGRES_DB")
user = os.getenv("POSTGRES_USER")


def with_connection(func):
    def wrapper(*args, **kwargs):
        conn = psycopg2.connect(
            host=host, database=database, user=user, password=password
        )
        cursor = conn.cursor()
        try:
            data = func(cursor, *args, **kwargs)
            conn.commit()
            return data
        except psycopg2.Error as e:
            conn.rollback()
            raise e
        finally:
            cursor.close()
            conn.close()

    return wrapper
