import pytest
from app.main import app as mi_app 

@pytest.fixture
def app():
    mi_app.config['TESTING'] = True
    yield mi_app

@pytest.fixture
def client(app):
    return app.test_client()