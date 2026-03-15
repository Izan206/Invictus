from app.db.database import db


def añadir_rutina(rutina):
    db.session.add(rutina)
    db.session.commit()
    
