from src.app import create_app
import pytest


@pytest.fixture()
def app():
    app = create_app()
    app.config.update(
        {
            "TESTING": True,
        }
    )

    yield app


@pytest.fixture()
def client(app):
    return app.test_client()


@pytest.fixture()
def runner(app):
    return app.test_cli_runner()


def test_status_unauthenticated(client):
    response = client.get("/status")
    assert response.status_code == 401
    assert response.json["status"] == "unauthenticated"
