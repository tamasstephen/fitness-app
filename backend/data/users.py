from data.connection import with_connection


@with_connection
def get_user_by_id(cursor, user_id):
    query = """
    SELECT email FROM users WHERE userid = %s
    """
    cursor.execute(query, (user_id,))
    return cursor.fetchone()


@with_connection
def create_user(cursor, user_id, email, training_level):
    query = """
    INSERT INTO users (userid, email, training_level) VALUES (%s, %s, %s)
    RETURNING email
    """
    cursor.execute(query, (user_id, email, training_level))
    return cursor.fetchone()[0]
