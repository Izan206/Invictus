from app.models.usuario import Usuario
from app.db.database import db

def obtener_usuario_por_username(username):
    return Usuario.query.filter_by(username=username).first()

def añadir_usuario(usuario):
    db.session.add(usuario)
    db.session.commit()
    
def obtener_usuario_por_id(usuario_id):
    usuario=Usuario.query.filter_by(id=usuario_id).first()
    return usuario

def obtener_usuario_por_email(email):
    usuario=Usuario.query.filter_by(email=email).first()
    return usuario

def guardar_cambios():
    db.session.commit()