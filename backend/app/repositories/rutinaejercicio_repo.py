from app.db.database import db
from app.models.rutinaejercicio import RutinaEjercicio


def guardar_ejercicio_en_rutina(rutina_ejercicio):
    db.session.add(rutina_ejercicio)
    db.session.commit()
    
def obtener_rutinaejercicio_por_idrutina_y_idejercicio(id_rutina, id_ejercicio):
    rutina_ejercicio=RutinaEjercicio.query.filter(RutinaEjercicio.rutina_id==id_rutina, RutinaEjercicio.ejercicio_id==id_ejercicio).first()
    return rutina_ejercicio

def obtener_ejercicios_rutina(id_rutina):
    ejercicios_rutina=RutinaEjercicio.query.filter_by(rutina_id=id_rutina).order_by(RutinaEjercicio.orden.asc()).all()
    return ejercicios_rutina

def confirmar_eliminacion_ejercicio_de_rutina(rutina_ejercicio):
    db.session.delete(rutina_ejercicio)
    db.session.commit()
    
def guardar_actualizacion_ejercicio():
    db.session.commit()