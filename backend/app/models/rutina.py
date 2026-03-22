from app.db.database import db

class Rutina(db.Model):
    __tablename__="rutina"
    id=db.Column(db.Integer, primary_key=True)
    nombre=db.Column(db.String(50), nullable=False)
    descripcion=db.Column(db.String(255))
    dias=db.Column(db.String(50))
    
    usuario_id = db.Column(db.Integer, db.ForeignKey('usuario.id'))
    
    usuario = db.relationship("Usuario", back_populates="rutinas")
    ejercicios = db.relationship("RutinaEjercicio", back_populates="rutina", cascade="all, delete-orphan")
    
    def __repr__(self):
        return f"<Rutina: {self.nombre}>"
    
    def to_dict(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "descripcion": self.descripcion,
            "dias": self.dias,
            "usuario_id": self.usuario_id
        }