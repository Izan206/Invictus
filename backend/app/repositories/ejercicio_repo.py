from app.models.ejercicio import Ejercicio
from app.db.database import db

def obtener_ejercicio_por_nombre(nombre):
    ejercicio=Ejercicio.query.filter_by(nombre=nombre).first()
    return ejercicio

def obtener_ejercicios_contengan_nombre(nombreBuscado):
    busqueda=f"%{nombreBuscado}%"
    ejercicio=Ejercicio.query.filter(Ejercicio.nombre.ilike(busqueda)).all()
    return ejercicio

def añadir_ejercicio(ejercicio):
    db.session.add(ejercicio)
    db.session.commit()

def obtener_todos_los_ejercicios():
    ejercicios=Ejercicio.query.limit(70).all()
    return ejercicios

def obtener_ejercicios_paginados(pagina=1, por_pagina=12):
    return Ejercicio.query.paginate(page=pagina, per_page=por_pagina, error_out=False)