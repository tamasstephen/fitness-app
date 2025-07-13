from flask import Flask, jsonify, redirect, session
from flask_cors import CORS
import os
from dotenv import load_dotenv
from flask_socketio import SocketIO
from authlib.integrations.flask_client import OAuth

socketio = SocketIO()

# Import the video blueprint and register its socket events
# NOTE: This is a workaround to avoid circular imports
from blueprints.video_server.video_server import video_bp
from blueprints.video_server.video_server import register_user_socket_events
from decorators.decorators import require_auth

# Load environment variables from a .env file (useful during local development)
load_dotenv()

allowed_origins = os.getenv("ALLOWED_DEVELOPMENT_ORIGIN") if os.getenv("FLASK_ENV") == "development" else os.getenv("CORS_ALLOWED_ORIGINS")


print(allowed_origins)

def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = os.getenv("SECRET_KEY")
    app.config['SESSION_COOKIE_HTTPONLY'] = True
    app.config['SESSION_COOKIE_SAMESITE'] = 'Lax'  # or 'None' for cross-domain
    app.config['SESSION_COOKIE_DOMAIN'] = None 
    # Enable CORS for all origins, allowing your React app to access the API.
    # In a production environment, you should restrict this to your frontend's domain.
    CORS(app)

    authority = os.getenv("COGNITO_AUTHORITY")
    client_id = os.getenv("COGNITO_CLIENT_ID")
    client_secret = os.getenv("COGNITO_CLIENT_SECRET")
    server_metadata_url = os.getenv("COGNITO_SERVER_METADATA_URL")

    oauth = OAuth(app)
    oauth.register(
      name='oidc',
      authority=authority,
      client_id=client_id,
      client_secret=client_secret,
      server_metadata_url=server_metadata_url,
      client_kwargs={'scope': 'phone openid email'}
    )

    # ------------------------------------------------------------------
    # URLs & endpoints that should come from environment configuration
    # ------------------------------------------------------------------
    frontend_url = os.getenv("FRONTEND_URL")
    authorize_redirect_url = os.getenv("AUTHORIZE_REDIRECT_URL")
    logout_uri_path = os.getenv("LOGOUT_URI")

    socketio.init_app(app, cors_allowed_origins=allowed_origins)
    app.register_blueprint(video_bp)
    
    # Register socket events from the video blueprint
    register_user_socket_events()

    @app.route('/')
    def home():
        return "Welcome to the Flask Backend!"

    @app.route('/api/data')
    @require_auth
    def get_data():
        """
        A simple API endpoint that returns some data.
        """
        data = {
            "message": "Hello from Flask!",
            "timestamp": os.getenv("FLASK_RUN_HOST", "localhost") + ":" + os.getenv("FLASK_RUN_PORT", "5000")
        }
        return jsonify(data)
    
    @app.route('/login')
    def login():
        print("login", session)
        return oauth.oidc.authorize_redirect(authorize_redirect_url)
    
    @app.route('/authorize')
    def authorize():
        try:
            print("authorize")
            token = oauth.oidc.authorize_access_token()
            print("token", token)
            user = token['userinfo']
            print("user", user)
            session['user'] = user
            return redirect(frontend_url)
        except Exception as e:
            print(f"Error: {e}")

        return redirect(frontend_url)
    
    @app.route('/logout')
    def logout():
        print("session", session)
        session.pop('user', None)
        print("logged out")
        print("session", session)
        
        # Instead of making a server-side request, redirect the browser to Cognito's logout endpoint
        cognito_domain = os.getenv("COGNITO_DOMAIN")
        cognito_logout_url = f'{cognito_domain}/logout'

        logout_params = {
            'client_id': client_id,
            'logout_uri': logout_uri_path,
        }
        
        # Build the logout URL with proper parameters
        import urllib.parse
        query_string = urllib.parse.urlencode(logout_params)
        full_logout_url = f"{cognito_logout_url}?{query_string}"
        
        print("Redirecting to Cognito logout:", full_logout_url)
        
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
    socketio.run(app, debug=True)