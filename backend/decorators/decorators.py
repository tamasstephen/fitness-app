from flask import session, jsonify


def require_auth(func):
    def wrapper(*args, **kwargs):
        if not session.get("user"):
            return jsonify({"error": "Unauthorized, authenticate first"}), 401
        return func(*args, **kwargs)

    return wrapper
