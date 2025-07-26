from flask import session, jsonify
from functools import wraps


def require_auth(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        if not session.get("user"):
            return jsonify({"error": "Unauthorized, authenticate first"}), 401
        return func(*args, **kwargs)

    return wrapper
