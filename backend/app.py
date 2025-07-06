from flask import Flask, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
# Enable CORS for all origins, allowing your React app to access the API.
# In a production environment, you should restrict this to your frontend's domain.
CORS(app)

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

if __name__ == '__main__':
    app.run(debug=True)