from blueprints.video_server.video_server import video_bp, register_user_socket_events
from blueprints.users.users import users_bp
import os
from flask import Flask, redirect, session
from flask_cors import CORS
from dotenv import load_dotenv
from flask_socketio import SocketIO
from authlib.integrations.flask_client import OAuth
from services import create_user_if_does_not_exist

socketio = SocketIO()


# Load environment variables from a .env file (useful during local development)
load_dotenv()

allowed_origins = (
    os.getenv("ALLOWED_DEVELOPMENT_ORIGIN")
    if os.getenv("FLASK_ENV") == "development"
    else os.getenv("CORS_ALLOWED_ORIGINS")
)


def create_app():
    secret_key = os.getenv("SECRET_KEY")

    if not secret_key:
        raise ValueError("SECRET_KEY is not set")
    app = Flask(__name__)
    app.config["SECRET_KEY"] = secret_key
    app.config["SESSION_COOKIE_HTTPONLY"] = True
    app.config["SESSION_COOKIE_SAMESITE"] = "Lax"  # or 'None' for cross-domain
    app.config["SESSION_COOKIE_DOMAIN"] = None

    # Enable CORS for all origins, allowing your React app to access the API.
    CORS(app, origins=allowed_origins, supports_credentials=True)

    authority = os.getenv("COGNITO_AUTHORITY")
    client_id = os.getenv("COGNITO_CLIENT_ID")
    client_secret = os.getenv("COGNITO_CLIENT_SECRET")
    server_metadata_url = os.getenv("COGNITO_SERVER_METADATA_URL")

    oauth = OAuth(app)
    oauth.register(
        name="oidc",
        authority=authority,
        client_id=client_id,
        client_secret=client_secret,
        server_metadata_url=server_metadata_url,
        client_kwargs={"scope": "phone openid email"},
    )

    # ------------------------------------------------------------------
    # URLs & endpoints that should come from environment configuration
    # ------------------------------------------------------------------
    frontend_url = os.getenv("FRONTEND_URL")
    authorize_redirect_url = os.getenv("AUTHORIZE_REDIRECT_URL")
    logout_uri_path = os.getenv("LOGOUT_URI")

    if not frontend_url or not authorize_redirect_url or not logout_uri_path:
        raise ValueError(
            "FRONTEND_URL, AUTHORIZE_REDIRECT_URL, or LOGOUT_URI is not set"
        )

    if not allowed_origins:
        raise ValueError("ALLOWED_ORIGINS is not set")

    socketio.init_app(app, cors_allowed_origins=allowed_origins)
    app.register_blueprint(video_bp)
    app.register_blueprint(users_bp, url_prefix="/users")

    # Register socket events from the video blueprint
    register_user_socket_events(socketio)

    @app.route("/")
    def home():
        return "Welcome to the Flask Backend!"

    @app.route("/status")
    def get_status():
        """
        A simple API endpoint that returns the authentication status.
        """
        session_user = session.get("user")
        print("session_user", session_user)

        if session_user:
            return {
                "status": "authenticated",
                "email": session_user["email"],
                "user_id": session_user["sub"],
            }
        else:
            return {"status": "unauthenticated"}, 401

    @app.route("/login")
    def login():
        return oauth.oidc.authorize_redirect(authorize_redirect_url)

    @app.route("/authorize")
    def authorize():
        try:
            token = oauth.oidc.authorize_access_token()
            user = token["userinfo"]
            session["user"] = user
            create_user_if_does_not_exist(user["sub"], user["email"])
            return redirect(f"{frontend_url}/auth/success")
        except Exception as e:
            print(f"Error: {e}")

        return redirect(frontend_url)

    @app.route("/logout")
    def logout():
        session.pop("user", None)

        cognito_domain = os.getenv("COGNITO_DOMAIN")
        cognito_logout_url = f"{cognito_domain}/logout"

        logout_params = {
            "client_id": client_id,
            "logout_uri": logout_uri_path,
        }

        # Build the logout URL with proper parameters
        import urllib.parse

        query_string = urllib.parse.urlencode(logout_params)
        full_logout_url = f"{cognito_logout_url}?{query_string}"

        # Redirect the browser to Cognito's logout endpoint
        return redirect(full_logout_url)

    @socketio.on("connect")
    def handle_connect():
        print("Client connected")

    @socketio.on("disconnect")
    def handle_disconnect():
        print("Client disconnected")

    return app


if __name__ == "__main__":
    app = create_app()
    socketio.run(app, debug=True, host="0.0.0.0", port=5001)
