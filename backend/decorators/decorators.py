from flask import session, redirect, url_for

def require_auth(func):
    def wrapper(*args, **kwargs):
        if not session.get('user'):
            return jsonify({'error': 'Unauthorized, authenticate first'}), 401
        return func(*args, **kwargs)
    return wrapper
