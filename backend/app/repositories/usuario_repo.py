from app.models.usuario import Usuario
from app.db.database import db

def obtener_usuario_por_username(username):
    return Usuario.query.filter_by(username=username).first()

def añadir_usuario(usuario):
    db.session.add(usuario)
    db.session.commit()