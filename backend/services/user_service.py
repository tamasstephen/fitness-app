from data.users import (
    create_user as create_user_data,
    get_user_by_id as get_user_by_id_data,
)
from constants.constants import TRAINING_LEVELS


def create_user(user_id, email, training_level):
    return create_user_data(user_id, email, training_level)


def get_user_by_id(user_id):
    return get_user_by_id_data(user_id)


def create_user_if_does_not_exist(user_id, email):
    user = get_user_by_id(user_id)

    if user:
        return user
    else:
        # TODO: get training level from user
        return create_user(user_id, email, TRAINING_LEVELS["beginner"])
