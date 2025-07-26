from .connection import with_connection


@with_connection
def create_training_session(
    cursor,
    date_time,
    duration,
    title,
    trainer_id,
    status,
    user_id,
):
    query = (
        "INSERT INTO training_session (user_id, date_time, duration, "
        "title, status, trainer_id) "
        "VALUES (%s, %s, %s, %s, %s, %s, %s) "
        "RETURNING id"
    )
    cursor.execute(
        query,
        (
            user_id,
            date_time,
            duration,
            title,
            status,
            trainer_id,
        ),
    )
    return cursor.fetchone()[0]


@with_connection
def get_training_sessions_by_user_id(cursor, user_id):
    query = (
        "SELECT id, date_time, duration, title, status, trainer_id "
        "FROM training_session WHERE user_id = %s "
        "ORDER BY date_time DESC"
    )
    cursor.execute(
        query,
        (user_id,),
    )
    return cursor.fetchall()


@with_connection
def get_training_session_by_id(cursor, training_session_id):
    query = """
    SELECT * FROM training_session WHERE id = %s
    """
    cursor.execute(query, (training_session_id,))
    return cursor.fetchone()
