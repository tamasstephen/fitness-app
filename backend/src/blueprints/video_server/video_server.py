from flask import Blueprint, request
from flask_socketio import emit, join_room

video_bp = Blueprint("video", __name__, url_prefix="/video")


def register_user_socket_events(socketio):
    @socketio.on("join_user_room", namespace="/video")
    def handle_join_user_room(data):
        room_id = data.get("room_id")
        room = f"room_{room_id}"
        join_room(room)
        print(f"User {request} joined room {room} for room_id {room_id}")
        emit("status_update", {"message": f"You joined room {room_id}"})
        emit(
            "room_activity",
            {"room_id": room_id, "activity": "joined"},
            include_self=False,
        )

    @socketio.on("disconnect", namespace="/video")
    def handle_disconnect_user_socket():
        print(f"Client {request} disconnected from /video namespace.")
