import os
import requests
import time
from collections import OrderedDict
from app.exceptions.exceptions import APIError

TIEMPO_LIMITE=3600
MAX_CACHE=10
EXERCISEDB_API = os.getenv("RAPIDAPI_KEY")

_cacheEjercicios=OrderedDict()

def fetch_ejercicios():
    categorias_api=["pectorals", "lats", "biceps", "triceps", "abs", "quads", "delts"]
    ejercicios_totales=[]
    
    key="lista_ejercicios"
    if key in _cacheEjercicios:
        datos=_cacheEjercicios[key]
        if (time.time()-datos["expiracion"])<TIEMPO_LIMITE:
            _cacheEjercicios.move_to_end(key)
            return datos["results"]
    
    headers = {
	    "x-rapidapi-key": EXERCISEDB_API,
	    "x-rapidapi-host": "exercisedb.p.rapidapi.com"
    }
    
    for target in categorias_api:
        url=f"https://exercisedb.p.rapidapi.com/exercises/target/{target}"
        querystring = {"limit": "10", "offset": "0"}
        try: 
            response=requests.get(url, headers=headers, params=querystring, timeout=10)
            response.raise_for_status()
            data_list=response.json()            
            ejercicios_totales.extend(data_list)
        except Exception as e:
            raise APIError(f"ExericseDB no responde: {str(e)}", 500)
    
    if ejercicios_totales:
        _cacheEjercicios[key]={
            "results": ejercicios_totales,
            "expiracion": time.time()
        }
        if len(_cacheEjercicios) > MAX_CACHE:
            _cacheEjercicios.popitem(last=False)
    return ejercicios_totales

def fetch_imagen_ejercicio(ejercicio_id):
    url = "https://exercisedb.p.rapidapi.com/image"
    querystring = {"resolution": "180", "exerciseId": str(ejercicio_id)} #180 especificamente porque es el limite que impone la API en el plan gratuito
    
    headers = {
        "x-rapidapi-key": EXERCISEDB_API,
        "x-rapidapi-host": "exercisedb.p.rapidapi.com"
    }

    try:
        response = requests.get(url, headers=headers, params=querystring, timeout=10)
        response.raise_for_status()
        content_type = response.headers.get('Content-Type', 'image/gif')
        return response.content, content_type
        
    except Exception as e:
        raise APIError(f"Error al obtener la imagen del ejercicio {ejercicio_id}: {str(e)}")
    
def fetch_ejercicio_por_nombre(nombre):
    key=f"ejercicio_{nombre}"
    if key in _cacheEjercicios:
        datos=_cacheEjercicios[key]
        if time.time()-datos["expiracion"]<TIEMPO_LIMITE:
            _cacheEjercicios.move_to_end(key)
            return datos["results"]
    
    headers = {
	    "x-rapidapi-key": EXERCISEDB_API,
	    "x-rapidapi-host": "exercisedb.p.rapidapi.com",
	    "Content-Type": "application/json"
    }
    
    url=f"https://exercisedb.p.rapidapi.com/exercises/name/{nombre}"
    querystring = {"limit": "10", "offset": "0"}
    
    try:
        response=requests.get(url, headers=headers, params=querystring, timeout=5)
        response.raise_for_status()
        if response.status_code==404:
            return []
        datos_ejercicio=response.json()
        _cacheEjercicios[key]={
            "results": datos_ejercicio,
            "expiracion": time.time()
        }
        if len(_cacheEjercicios) > MAX_CACHE:
            _cacheEjercicios.popitem(last=False)
            
        return datos_ejercicio
    except Exception as e:
        raise APIError(f"Error al obtener el ejercicio con el nombre {nombre}: {str(e)}")