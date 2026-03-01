from flask import Flask
from config import Config
from db.database import db

app=Flask(__name__)

app.config.from_object(Config)
    
db.init_app(app)
@app.route('/')
def hello_world():
    return "Bienvenido a Invictus!"

if __name__=="__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)