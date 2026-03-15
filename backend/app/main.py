from flask import Flask
from app.config import Config
from app.db.database import db
from app.models.usuario import Usuario
from app.models.rutina import Rutina
from app.models.ejercicio import Ejercicio
from app.models.rutinaejercicio import RutinaEjercicio
from app.routes.auth_routes import auth_bp
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
from app.routes.ejercicios_routes import ejercicios_bp

app=Flask(__name__)

app.config.from_object(Config)
    
db.init_app(app)
jwt=JWTManager(app)
migrate= Migrate(app, db)

app.register_blueprint(auth_bp, url_prefix="/auth")
app.register_blueprint(ejercicios_bp, url_prefix="/api/ejercicios")
@app.route('/')
def hello_world():
    return "Bienvenido a Invictus!"
    
if __name__=="__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)