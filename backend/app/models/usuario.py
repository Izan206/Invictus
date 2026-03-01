from enum import Enum

from db.database import db
from werkzeug.security import generate_password_hash, check_password_hash

class TipoUsuario(Enum):
    admin="admin"
    normal="normal"
    
class Usuario(db.Model):
    __tablename__="usuario"
    id=db.Column(db.Integer, primary_key=True)
    username=db.Column(db.String(50), unique=True, nullable=False)
    email=db.Column(db.String(50), unique=True, nullable=False)
    password_hash=db.Column(db.String(255), nullable=False)
    rol=db.Column(db.Enum(TipoUsuario), default=TipoUsuario.normal, nullable=False)
    peso=db.Column(db.Float)
    altura=db.Column(db.Float)
    edad=db.Column(db.Integer)
    rutinas = db.relationship("Rutina", back_populates="usuario")
    
    def set_password(self, password_introducida):
        self.password_hash=generate_password_hash(password_introducida)
    
    def check_password(self, password_introducida):
        return check_password_hash(self.password_hash, password_introducida)
    
    def __repr__(self):
        return f'<Usuario {self.username}>'