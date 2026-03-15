from app.db.database import db

class RutinaEjercicio(db.Model):
    __tablename__="tener"
    rutina_id=db.Column(db.Integer, db.ForeignKey('rutina.id'), primary_key=True)
    ejercicio_id=db.Column(db.Integer, db.ForeignKey('ejercicio.id'), primary_key=True)
    series=db.Column(db.Integer, default=3)
    repeticiones=db.Column(db.Integer, default=8)
    
    rutina = db.relationship("Rutina", back_populates="ejercicios")
    ejercicio = db.relationship("Ejercicio", back_populates="rutinas")