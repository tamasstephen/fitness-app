from data.connection import with_connection


@with_connection
def get_user_by_id(cursor, user_id):
    cursor.execute("SELECT email FROM users WHERE userid = %s", (user_id,))
    return cursor.fetchone()


@with_connection
def create_user(cursor, user_id, email, training_level):
    cursor.execute(
        "INSERT INTO users (userid, email, training_level) VALUES (%s, %s, %s)",
        (user_id, email, training_level),
    )
    cursor.execute("SELECT email FROM users WHERE userid = %s", (user_id,))
    return cursor.fetchone()
