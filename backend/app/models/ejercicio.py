from app.db.database import db

class Ejercicio(db.Model):
    __tablename__="ejercicio"
    id=db.Column(db.Integer, primary_key=True)
    id_api=db.Column(db.String(50), unique=True, nullable=False)
    nombre=db.Column(db.String(100), nullable=False)
    descripcion=db.Column(db.String(1000), nullable=False)
    dificultad=db.Column(db.String(50), nullable=False)
    instrucciones=db.Column(db.JSON)
    image_url=db.Column(db.String(200))
    maquina=db.Column(db.String(100))
    grupo_muscular=db.Column(db.String(50), nullable=False)
    
    rutinas = db.relationship("RutinaEjercicio", back_populates="ejercicio")
    
    def __repr__(self):
        return f'<Ejercicio {self.nombre}>'
    
    def to_dict(self):
        return {
            "id": self.id,
            "id_api": self.id_api,
            "nombre": self.nombre,
            "descripcion": self.descripcion,
            "dificultad": self.dificultad,
            "instrucciones": self.instrucciones, 
            "image_url": self.image_url,
            "maquina": self.maquina,
            "grupo_muscular": self.grupo_muscular
        }