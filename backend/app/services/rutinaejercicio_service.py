from app.models.rutinaejercicio import RutinaEjercicio
from app.repositories.rutinaejercicio_repo import guardar_ejercicio_en_rutina
from app.exceptions.exceptions import EjercicioEnRutinaYaExistente


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
    