import pytest
from unittest.mock import patch
from app.models.usuario import Usuario
from app.exceptions.exceptions import DatosFaltantesError, UsuarioExistenteError

def test_register_exito(client):
    data = {
        "username": "nuevo_usuario",
        "email": "hola@gmail.com",
        "password": "abc123."
    }

    mock_usuario = Usuario(username=data["username"], email=data["email"])

    with patch("app.routes.auth_routes.crear_usuario") as mock_crear_usuario:
        mock_crear_usuario.return_value = mock_usuario
        response = client.post("/auth/register", json=data)

    assert response.status_code == 201
    respuesta_json = response.get_json()
    assert respuesta_json["exito"] is True
    assert respuesta_json["usuario"] == "nuevo_usuario"


def test_register_datos_faltantes(client):
    data = {
        "username": "",
        "email": "nuevo@invictus.com",
        "password": "abc123."
    }

    with patch("app.routes.auth_routes.crear_usuario") as mock_crear_usuario:
        mock_crear_usuario.side_effect = DatosFaltantesError("Faltan los datos obligatorios.")
        response = client.post("/auth/register", json=data)

    assert response.status_code == 400
    respuesta_json = response.get_json()
    assert respuesta_json["exito"] is False


def test_register_usuario_existente(client):
    data = {
        "username": "usuario_duplicado",
        "email": "duplicado@gmail.com",
        "password": "abc123."
    }

    with patch("app.routes.auth_routes.crear_usuario") as mock_crear_usuario:
        mock_crear_usuario.side_effect = UsuarioExistenteError("Registrar un username o email que ya existe.")
        
        response = client.post("/auth/register", json=data)

    assert response.status_code == 409
    respuesta_json = response.get_json()
    assert respuesta_json["exito"] is False


def test_register_sin_datos(client):
    response = client.post("/auth/register", json={})

    assert response.status_code == 400
    respuesta_json = response.get_json()
    assert respuesta_json["exito"] is False

