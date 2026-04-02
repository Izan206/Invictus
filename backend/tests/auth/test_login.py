import pytest
from unittest.mock import patch
from app.models.usuario import Usuario
from app.exceptions.exceptions import CredencialesInvalidasError

def test_login_exito(client):
    data = {
        "username": "usuario_valido",
        "password": "abc123."
    }

    mock_usuario = Usuario(username=data["username"], email="abc@gmail.com")

    with patch("app.routes.auth_routes.autenticacion") as mock_auth, \
         patch("app.routes.auth_routes.create_access_token") as mock_token:
        
        mock_auth.return_value = mock_usuario
        mock_token.return_value = "token_jwt_falso"
        
        response = client.post("/auth/login", json=data)

    assert response.status_code == 200
    respuesta_json = response.get_json()
    assert respuesta_json["exito"] is True
    assert respuesta_json["usuario"] == "usuario_valido"
    assert respuesta_json["token"] == "token_jwt_falso"


def test_login_credenciales_invalidas(client):
    data = {
        "username": "usuario_invalido",
        "password": "abc1234."
    }

    with patch("app.routes.auth_routes.autenticacion") as mock_auth:
        mock_auth.side_effect = CredencialesInvalidasError("Usuario o la contraseña no coinciden.")
        
        response = client.post("/auth/login", json=data)

    assert response.status_code == 401
    respuesta_json = response.get_json()
    assert respuesta_json["exito"] is False
    assert respuesta_json["error"] == "Usuario o la contraseña no coinciden."


def test_login_sin_datos(client):
    response = client.post("/auth/login", json={})

    assert response.status_code == 400
    respuesta_json = response.get_json()
    assert respuesta_json["exito"] is False
    assert respuesta_json["error"] == "Ausencia de datos"