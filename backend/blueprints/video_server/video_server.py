from decorators.decorators import require_auth
from flask import Blueprint, jsonify, request
from flask_socketio import emit, join_room, leave_room

# Import the global socketio instance
# This assumes `socketio` is defined and then initialized in `app.py`
from app import socketio # Important: This import needs careful handling, see note below

video_bp = Blueprint('video', __name__, url_prefix='/video')


# --- Socket.IO Event Handlers for Users ---
# You can define a function to register events with the global socketio instance
def register_user_socket_events():
    @require_auth
    @socketio.on('join_user_room', namespace='/video')
    def handle_join_user_room(data):
        room_id = data.get('room_id')
        room = f'room_{room_id}'
        join_room(room)
        print(f"User {request.sid} joined room {room} for room_id {room_id}")
        emit('status_update', {'message': f'You joined room {room_id}'}, room=request.sid)
        emit('room_activity', {'room_id': room_id, 'activity': 'joined'}, room=room, include_self=False)

    @socketio.on('disconnect', namespace='/video')
    def handle_disconnect_user_socket():
        print(f"Client {request.sid} disconnected from /users namespace.")

# NOTE ON CIRCULAR IMPORTS:
# Importing `socketio` from `app` directly can lead to circular import issues
# if `app.py` also imports `users.py` at the top level.
# A common pattern to avoid this is:
# 1. Initialize `socketio = SocketIO()` at the top level in `app.py`.
# 2. Pass the `socketio` instance to the blueprint's registration function.
#    (See "Alternative: Passing SocketIO Instance" below)
# 3. Or, ensure the `import app` (and thus `socketio`) happens *after* Flask app
#    and socketio are defined, typically within a function like `create_app` or
#    just before blueprint registration in `app.py`. The example above assumes
#    Python's lazy import handling or a careful `if __name__ == '__main__':` block.