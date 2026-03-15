from app.services.usuario_service import recibir_usuario_por_username
from app.main import app, db
from app.models.usuario import Usuario
from app.models.rutina import Rutina
from app.models.ejercicio import Ejercicio
from app.models.rutinaejercicio import RutinaEjercicio

def seed_data():
    with app.app_context():
        alberto = recibir_usuario_por_username("alberto")
        if not alberto:
            alberto = Usuario(username="alberto", email="alberto@gmail.com", peso=75.0, altura=175, edad=25)
            alberto.set_password("1234")
            db.session.add(alberto)
            db.session.commit() 

        ejercicio1 = Ejercicio.query.filter_by(nombre="Press de Banca").first()
        if not ejercicio1:
            ejercicio1 = Ejercicio(id_api="demo_001", nombre="Press de Banca", descripcion="Pecho y tríceps", grupo_muscular="Pecho")
            db.session.add(ejercicio1)

        ejercicio2 = Ejercicio.query.filter_by(nombre="Sentadilla").first()
        if not ejercicio2:
            ejercicio2 = Ejercicio(id_api="demo_002", nombre="Sentadilla", descripcion="Piernas y glúteos", grupo_muscular="Piernas")
            db.session.add(ejercicio2)
            
        db.session.commit()

        rutina_alberto = Rutina.query.filter_by(nombre="Rutina de Fuerza", usuario_id=alberto.id).first()
        if not rutina_alberto:
            rutina_alberto = Rutina(nombre="Rutina de Fuerza", descripcion="Rutina básica", dias="Lunes y Jueves", usuario_id=alberto.id)
            db.session.add(rutina_alberto)
            db.session.commit()

            rutina_ejercicio1 = RutinaEjercicio(rutina_id=rutina_alberto.id, ejercicio_id=ejercicio1.id, series=4, repeticiones=10)
            rutina_ejercicio2 = RutinaEjercicio(rutina_id=rutina_alberto.id, ejercicio_id=ejercicio2.id, series=3, repeticiones=12)
            
            db.session.add(rutina_ejercicio1)
            db.session.add(rutina_ejercicio2)
            db.session.commit()

        print("Seed completado")

if __name__ == "__main__":
    seed_data()