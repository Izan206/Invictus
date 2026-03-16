from app.exceptions.exceptions import CrearRutinaError, RutinaNoEncontradaError
from app.models.rutina import Rutina
from app.repositories.rutina_repo import añadir_rutina, obtener_rutina_por_id, obtener_rutina_por_nombre


def crear_rutina(nombre, descripcion, dias, usuario_id):
    rutina = Rutina(nombre=nombre, descripcion=descripcion, dias=dias, usuario_id=usuario_id)
    try:
        añadir_rutina(rutina)
        return rutina
    except Exception as e:
        raise CrearRutinaError(f"Error al crear la rutina {nombre}: {str(e)}")

def recibir_rutina_por_nombre(nombre_rutina):
    rutina=obtener_rutina_por_nombre(nombre_rutina)
    if rutina:
        return rutina
    else:
        raise RutinaNoEncontradaError(f"No se ha encontrado la rutina con el nombre {nombre_rutina}")
    
def recibir_rutina_por_id(id_rutina):
    rutina=obtener_rutina_por_id(id_rutina)
    if rutina:
        return rutina
    else:
        raise RutinaNoEncontradaError(f"No se ha encontrado la rutina con el id {id_rutina}")