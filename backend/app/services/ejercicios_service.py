from app.repositories.ejercicio_repo import añadir_ejercicio, obtener_ejercicio_por_nombre, obtener_ejercicios_contengan_nombre, obtener_todos_los_ejercicios
from app.models.ejercicio import Ejercicio
from app.db.database import db
from app.clients.exercisedb_client import fetch_ejercicio_por_nombre, fetch_ejercicios
from app.exceptions.exceptions import APIError, EjercicioNoEncontradoError, EjercicioYaExistenteError, EjerciciosNoEncontradosError

def recibir_ejercicio_por_nombre(nombre):
    ejercicio = obtener_ejercicio_por_nombre(nombre)
    if ejercicio is None:
        raise EjercicioNoEncontradoError(f"No se ha encontrado el ejercicio con el nombre {nombre}")
    return ejercicio

def buscar_ejercicio_por_nombre(nombre):
    ejerciciosEnBd=obtener_ejercicios_contengan_nombre(nombre)
    if ejerciciosEnBd:
        return ejerciciosEnBd
    else:
        ejercicios_api=fetch_ejercicio_por_nombre(nombre)
        if not ejercicios_api:
            return []
        ejercicios_adaptados_api=adaptar_ejercicios(ejercicios_api)
    return ejercicios_adaptados_api
            
def crear_ejercicio(id_api, nombre, descripcion, dificultad, instrucciones, image_url, maquina, grupo_muscular):
    ejercicioBD = Ejercicio(
        id_api=id_api, 
        nombre=nombre, 
        descripcion=descripcion, 
        dificultad=dificultad, 
        instrucciones=instrucciones, 
        image_url=image_url, 
        maquina=maquina, 
        grupo_muscular=grupo_muscular
    )
  
    try:
        añadir_ejercicio(ejercicioBD)
        return ejercicioBD
    except Exception as e:
        raise EjercicioYaExistenteError("El ejercicio ya existe en la base de datos")
  
def adaptar_ejercicios(ejerciciosBuscador=None):
    if not ejerciciosBuscador:
        ejercicios = fetch_ejercicios()
    else:
        ejercicios = ejerciciosBuscador
        
    if not ejercicios:
        return []
    
    ejerciciosAdaptados = []
    for ejercicio in ejercicios:
        nombre_api = ejercicio.get("name")
        try:
            ejercicio_existente = recibir_ejercicio_por_nombre(nombre_api)
            ejerciciosAdaptados.append(ejercicio_existente)
        except EjercicioNoEncontradoError:
            id_api = ejercicio.get("id")
            descripcion = ejercicio.get("description")
            dificultad = ejercicio.get("difficulty")
            instrucciones = ejercicio.get("instructions", [])
            maquina = ejercicio.get("equipment")
            grupo_muscular = ejercicio.get("target")
            
            url_imagen = f"/api/ejercicios/{id_api}/imagen"
            
            ejercicioBD = crear_ejercicio(
                id_api, nombre_api, descripcion, dificultad, instrucciones, url_imagen, maquina, grupo_muscular
            )
            ejerciciosAdaptados.append(ejercicioBD)
            
    return ejerciciosAdaptados

def recibir_todos_los_ejercicios():
    ejercicios = obtener_todos_los_ejercicios()

    if not ejercicios or len(ejercicios) == 0:
        ejercicios = adaptar_ejercicios() 
        if len(ejercicios) > 50:
            ejercicios = ejercicios[:50]
    if not ejercicios:
        raise EjerciciosNoEncontradosError("No se han encontrado ejercicios ni en local ni en la API")
        
    return ejercicios