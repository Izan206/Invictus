from deep_translator import GoogleTranslator
from app.repositories.ejercicio_repo import añadir_ejercicio, obtener_ejercicio_por_nombre, obtener_ejercicios_contengan_nombre, obtener_ejercicios_paginados, obtener_todos_los_ejercicios, obtener_ejercicio_por_id_api
from app.models.ejercicio import Ejercicio
from app.db.database import db
from app.clients.exercisedb_client import fetch_ejercicio_por_nombre, fetch_ejercicios
from app.exceptions.exceptions import APIError, EjercicioNoEncontradoError, EjercicioYaExistenteError, EjerciciosNoEncontradosError

traductor = GoogleTranslator(source='en', target='es')
def traducir_texto(texto):
    if not texto: 
        return texto
    try:
        return traductor.translate(texto)
    except:
        return texto
    
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
        db.session.rollback()
        raise EjercicioYaExistenteError(f"El ejercicio ya existe o hay un dato duplicado: {str(e)}")
  
def adaptar_ejercicios(ejerciciosBuscador=None):
    if not ejerciciosBuscador:
        ejercicios = fetch_ejercicios()
    else:
        ejercicios = ejerciciosBuscador
        
    if not ejercicios:
        return []

    dicc_musculos = {
        "pectorals": "Pecho", "lats": "Espalda", "biceps": "Bíceps", 
        "triceps": "Tríceps", "abs": "Abdominales", "quads": "Pierna", "delts": "Hombros"
    }
    dicc_dificultad = {
        "beginner": "Principiante", "intermediate": "Intermedio", "expert": "Avanzado"
    }
    
    ejerciciosAdaptados = []
    
    for ejercicio in ejercicios:
        id_api = ejercicio.get("id")
        
        ejercicio_existente = obtener_ejercicio_por_id_api(id_api)
        
        if ejercicio_existente:
            ejerciciosAdaptados.append(ejercicio_existente)
        else:
            nombre_original = ejercicio.get("name")
            print(f"Traduciendo y guardando: {nombre_original}...")
            
            nombre_es = traducir_texto(nombre_original)
            
            if obtener_ejercicio_por_nombre(nombre_es) is not None:
                nombre_es = f"{nombre_es} ({id_api})"
            
            descripcion_es = traducir_texto(ejercicio.get("description"))
            maquina_es = traducir_texto(ejercicio.get("equipment"))
            
            instrucciones_en = ejercicio.get("instructions", [])
            instrucciones_es = []
            for paso in instrucciones_en:
                instrucciones_es.append(traducir_texto(paso))
            
            dificultad_en = ejercicio.get("difficulty")
            dificultad_es = dicc_dificultad.get(dificultad_en, traducir_texto(dificultad_en))
            
            grupo_en = ejercicio.get("target")
            grupo_muscular_es = dicc_musculos.get(grupo_en, traducir_texto(grupo_en))
            
            url_imagen = f"/api/ejercicios/{id_api}/imagen"
            
            ejercicioBD = crear_ejercicio(
                id_api, nombre_es, descripcion_es, dificultad_es, instrucciones_es, url_imagen, maquina_es, grupo_muscular_es
            )
            ejerciciosAdaptados.append(ejercicioBD)
            
    return ejerciciosAdaptados

def recibir_todos_los_ejercicios():
    ejercicios = obtener_todos_los_ejercicios()
    
    if not ejercicios or len(ejercicios) == 0:
        ejercicios = adaptar_ejercicios() 
        
        if len(ejercicios) > 70:
            lista_limitada = []
            contador = 0
            for ejercicio in ejercicios:
                if contador < 70:
                    lista_limitada.append(ejercicio)
                    contador += 1
    
            ejercicios = lista_limitada
            
    if not ejercicios:
        raise EjerciciosNoEncontradosError("No se han encontrado ejercicios")
        
    return ejercicios

def recibir_catalogo_paginado(pagina=1, por_pagina=12):
    paginacion = obtener_ejercicios_paginados(pagina, por_pagina)
    
    if paginacion.total == 0:
        adaptar_ejercicios()
        
        paginacion = obtener_ejercicios_paginados(pagina, por_pagina)
        
    if paginacion.total == 0:
        raise EjerciciosNoEncontradosError("No se han encontrado ejercicios para el catálogo")
        
    return paginacion