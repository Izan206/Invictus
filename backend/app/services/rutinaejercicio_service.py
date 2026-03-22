from app.models.rutinaejercicio import RutinaEjercicio
from app.repositories.rutinaejercicio_repo import confirmar_eliminacion_ejercicio_de_rutina, guardar_ejercicio_en_rutina, obtener_rutinaejercicio_por_idrutina_y_idejercicio
from app.exceptions.exceptions import EjercicioEnRutinaYaExistente, EjercicioNoEnRutinaError


def añadir_ejercicio_a_rutina(id_rutina, data):
    ejercicio_id=data.get("ejercicio_id")
    series=data.get("series", 3)
    repeticiones=data.get("repeticiones", 8)
    
    try:
        rutina_ejercicio= RutinaEjercicio(rutina_id=id_rutina, ejercicio_id=ejercicio_id, series=series, repeticiones=repeticiones)
        guardar_ejercicio_en_rutina(rutina_ejercicio)
        return rutina_ejercicio
    except:
        raise EjercicioEnRutinaYaExistente("Ya existe este ejercicio en la rutina, añade series o repeticiones")

 
def recibir_rutinaejercicio_por_idrutina_y_idejercicio(id_rutina, id_ejercicio):
    rutina_ejercicio = obtener_rutinaejercicio_por_idrutina_y_idejercicio(id_rutina, id_ejercicio)

    if not rutina_ejercicio:
        raise EjercicioNoEnRutinaError("No se ha encontrado el ejercicio en la rutina seleccionada")
        
    return rutina_ejercicio
    
def eliminar_ejercicio_de_rutina(rutina_ejercicio):
    try:
        confirmar_eliminacion_ejercicio_de_rutina(rutina_ejercicio)
    except:
        raise EjercicioNoEnRutinaError("No se ha encontrado el ejercicio en la rutina seleccionada")