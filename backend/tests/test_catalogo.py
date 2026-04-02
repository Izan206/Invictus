import pytest
from unittest.mock import patch
from app.models.ejercicio import Ejercicio 

def test_get_catalogo_integracion(client):
    mock_data = [
        Ejercicio(id=1, nombre="Press Militar", grupo_muscular="Hombros"),
        Ejercicio(id=2, nombre="Peso Muerto", grupo_muscular="Espalda")
    ]

    with patch("app.services.ejercicios_service.obtener_todos_los_ejercicios") as mock_repo:
        mock_repo.return_value = mock_data
        
        response = client.get("/api/ejercicios/catalogo")

    assert response.status_code == 200
    json_data = response.get_json()
    assert json_data["exito"] is True
    assert len(json_data["resultados"]) == 2 
    assert json_data["resultados"][0]["nombre"] == "Press Militar"