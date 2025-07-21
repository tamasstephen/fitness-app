from flask import Blueprint
from mocks.mock_session import MOCK_TRAINING_SESSION
from decorators.decorators import require_auth

users_bp = Blueprint("users", __name__, url_prefix="/users")


@users_bp.route("/<string:user_id>/training-sessions")
@require_auth
def get_training_sessions(user_id):
    return {"items": [MOCK_TRAINING_SESSION]}
