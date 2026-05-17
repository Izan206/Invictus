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

def obtener_ejercicio_por_id(id):
    ejercicio=Ejercicio.query.filter_by(id=id).first()
    return ejercicio

def obtener_ejercicio_por_id_api(id_api):
    ejercicio = Ejercicio.query.filter_by(id_api=id_api).first()
    return ejercicio

def obtener_ejercicios_paginados(pagina=1, por_pagina=12, categoria=None, busqueda=None):
    query = Ejercicio.query
    if categoria and categoria.lower() != 'todo':
        query = query.filter(Ejercicio.grupo_muscular.ilike(f"%{categoria}%"))
        
    if busqueda:
        query = query.filter(Ejercicio.nombre.ilike(f"%{busqueda}%"))

    return query.paginate(page=pagina, per_page=por_pagina, error_out=False)