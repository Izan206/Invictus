from app.db.database import db


def guardar_ejercicio_en_rutina(rutina_ejercicio):
    db.session.add(rutina_ejercicio)
    db.session.commit()