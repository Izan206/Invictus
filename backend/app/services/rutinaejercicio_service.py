from app.models.rutinaejercicio import RutinaEjercicio
from app.repositories.rutinaejercicio_repo import confirmar_eliminacion_ejercicio_de_rutina, guardar_actualizacion_ejercicio, guardar_ejercicio_en_rutina, obtener_ejercicios_rutina, obtener_rutinaejercicio_por_idrutina_y_idejercicio
from app.exceptions.exceptions import EjercicioEnRutinaYaExistente, EjercicioNoEnRutinaError


def añadir_ejercicio_a_rutina(id_rutina, data):
    ejercicio_id=data.get("ejercicio_id")
    series=data.get("series", 3)
    repeticiones=data.get("repeticiones", 8)
    peso = data.get("peso")

    ejercicio_bd = obtener_rutinaejercicio_por_idrutina_y_idejercicio(id_rutina, ejercicio_id)

    if ejercicio_bd:
        raise EjercicioEnRutinaYaExistente("Ya existe este ejercicio en la rutina, edita las series, repeticiones o peso")
    
    rutina_ejercicio= RutinaEjercicio(rutina_id=id_rutina, ejercicio_id=ejercicio_id, series=series, repeticiones=repeticiones, peso=peso)
    guardar_ejercicio_en_rutina(rutina_ejercicio)
    return rutina_ejercicio


def recibir_ejercicios_por_rutina(id_rutina):
    ejercicios_rutina=obtener_ejercicios_rutina(id_rutina)
    return ejercicios_rutina
     
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
    
def actualizar_ejercicio_en_rutina(id_rutina, id_ejercicio, data):
    rutina_ejercicio = obtener_rutinaejercicio_por_idrutina_y_idejercicio(id_rutina, id_ejercicio)
    if not rutina_ejercicio:
        raise EjercicioNoEnRutinaError("No se ha encontrado el ejercicio en la rutina seleccionada")
    
    rutina_ejercicio.series = data.get("series", rutina_ejercicio.series)
    rutina_ejercicio.repeticiones = data.get("repeticiones", rutina_ejercicio.repeticiones)
    rutina_ejercicio.peso = data.get("peso", rutina_ejercicio.peso)

    guardar_actualizacion_ejercicio()
    return rutina_ejercicio