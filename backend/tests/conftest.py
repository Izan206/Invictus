import pytest
from app.main import app as mi_app 

@pytest.fixture
def app():
    mi_app.config['TESTING'] = True
    mi_app.config['JWT_SECRET_KEY'] = 'clave-secreta'
    yield mi_app

@pytest.fixture
def client(app):
    return app.test_client()