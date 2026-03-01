from flask import Flask
from config import Config
from db.database import db
from models.usuario import Usuario
from models.rutina import Rutina
from models.ejercicio import Ejercicio
from models.rutinaejercicio import RutinaEjercicio

app=Flask(__name__)

app.config.from_object(Config)
    
db.init_app(app)
@app.route('/')
def hello_world():
    return "Bienvenido a Invictus!"

with app.app_context():
    print("creando tablas")
    db.create_all()
    print("tablas creadas")
    
if __name__=="__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)