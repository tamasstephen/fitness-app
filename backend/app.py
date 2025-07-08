from flask import Flask, jsonify
from flask_cors import CORS
import os
from flask_socketio import SocketIO

socketio = SocketIO()

# Import the video blueprint and register its socket events
# NOTE: This is a workaround to avoid circular imports
from blueprints.video_server.video_server import video_bp
from blueprints.video_server.video_server import register_user_socket_events

allowed_origins = os.getenv("ALLOWED_DEVELOPMENT_ORIGIN") if os.getenv("FLASK_ENV") == "development" else os.getenv("CORS_ALLOWED_ORIGINS")

print(allowed_origins)

def create_app():
    app = Flask(__name__)
    # Enable CORS for all origins, allowing your React app to access the API.
    # In a production environment, you should restrict this to your frontend's domain.
    CORS(app)

    socketio.init_app(app, cors_allowed_origins=allowed_origins)
    app.register_blueprint(video_bp)
    
    # Register socket events from the video blueprint
    register_user_socket_events()

    @app.route('/')
    def home():
        return "Welcome to the Flask Backend!"

    @app.route('/api/data')
    def get_data():
        """
        A simple API endpoint that returns some data.
        """
        data = {
            "message": "Hello from Flask!",
            "timestamp": os.getenv("FLASK_RUN_HOST", "localhost") + ":" + os.getenv("FLASK_RUN_PORT", "5000")
        }
        return jsonify(data)

    @socketio.on("connect")
    def handle_connect():
        print("Client connected")

    @socketio.on("disconnect")
    def handle_disconnect():
        print("Client disconnected")
    
    return app


if __name__ == "__main__":
    app = create_app()
    socketio.run(app, debug=True)