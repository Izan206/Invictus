from db.database import db

class Ejercicio(db.Model):
    __tablename__="ejercicio"
    id=db.Column(db.Integer, primary_key=True)
    id_api=db.Column(db.String(50), unique=True, nullable=False)
    nombre=db.Column(db.String(50), nullable=False)
    descripcion=db.Column(db.String(200), nullable=False)
    video_url=db.Column(db.String(200))
    image_url=db.Column(db.String(200))
    maquina=db.Column(db.String(50))
    grupo_muscular=db.Column(db.String(50), nullable=False)
    
    rutinas = db.relationship("RutinaEjercicio", back_populates="ejercicio")
    
    def __repr__(self):
        return f'<Ejercicio {self.nombre}>'