from flask import Blueprint
from decorators.decorators import require_auth
from data.training_sessions import get_training_sessions_by_user_id

users_bp = Blueprint("users", __name__, url_prefix="/users")


@users_bp.route("/<string:user_id>/training-sessions")
@require_auth
def get_training_sessions(user_id):
    training_sessions = get_training_sessions_by_user_id(user_id)
    result = [dict(training_session) for training_session in training_sessions]
    return {"items": result}
