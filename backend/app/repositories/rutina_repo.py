from app.db.database import db
from app.models.rutina import Rutina


def añadir_rutina(rutina):
    db.session.add(rutina)
    db.session.commit()
    
def obtener_rutina_por_nombre(nombre):
    rutina=Rutina.query.filter_by(nombre=nombre).first()
    return rutina

    
def obtener_rutina_por_id(id):
    rutina=Rutina.query.filter_by(id=id).first()
    return rutina