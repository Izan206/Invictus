import pytest
from unittest.mock import patch
from flask_jwt_extended import create_access_token
from app.models.rutina import Rutina 
from app.models.usuario import Usuario

def test_crear_rutina_exito(client, app):
    with app.app_context():
        token = create_access_token(identity="izan_usuario")
    
    headers = {"Authorization": f"Bearer {token}"}

    datos_rutina = {
        "nombre": "Rutina de Fuerza Máxima",
        "descripcion": "Para reventar marcas",
        "dias": 4
    }

    mock_usuario = Usuario(id=1, username="izan_usuario")
    mock_rutina = Rutina(id=1, nombre=datos_rutina["nombre"], descripcion=datos_rutina["descripcion"], dias=datos_rutina["dias"], usuario_id=mock_usuario.id)
    
    with patch("app.routes.rutinas_routes.recibir_usuario_por_username") as mock_get_user, \
         patch("app.routes.rutinas_routes.crear_rutina") as mock_crear_rutina:
        
        mock_get_user.return_value = mock_usuario
        mock_crear_rutina.return_value = mock_rutina
        
        response = client.post("/api/rutinas/crear_rutina", json=datos_rutina, headers=headers)

    assert response.status_code == 201 
    respuesta_json = response.get_json()
    assert respuesta_json["exito"] is True
    assert "Se ha creado la rutina" in respuesta_json["mensaje"]
    assert respuesta_json["results"]["nombre"] == "Rutina de Fuerza Máxima" 


def test_crear_rutina_sin_token_da_error(client):
    datos_rutina = {"nombre": "RutinaError", "descripcion": "debe dar error", "dias": 1}
    response = client.post("/api/rutinas/crear_rutina", json=datos_rutina)
    
    assert response.status_code == 401