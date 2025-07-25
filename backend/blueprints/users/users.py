from flask import Blueprint
from decorators.decorators import require_auth
from data.training_sessions import get_training_sessions_by_user_id

users_bp = Blueprint("users", __name__, url_prefix="/users")


@users_bp.route("/<string:user_id>/training-sessions")
@require_auth
def get_training_sessions(user_id):
    training_sessions = get_training_sessions_by_user_id(user_id)
    result = []
    for session in training_sessions:
        result.append(
            {
                "id": session[0],
                "date_time": session[1],
                "duration": session[2],
                "title": session[3],
                "training_status": session[4],
                "trainer_id": session[5],
            }
        )
    return {"items": result}
