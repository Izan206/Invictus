import os

from flask import Blueprint, jsonify, send_file, request
from flask_jwt_extended import jwt_required
from app.services.ejercicios_service import adaptar_ejercicios, buscar_ejercicio_por_nombre, recibir_ejercicio_por_id, recibir_todos_los_ejercicios, recibir_catalogo_paginado
from app.repositories.ejercicio_repo import obtener_ejercicio_por_id_api
from app.clients.exercisedb_client import fetch_imagen_ejercicio
from app.exceptions.exceptions import EjerciciosNoEncontradosError

ejercicios_bp = Blueprint('ejercicios', __name__)

@ejercicios_bp.route('/obtener-ejercicios', methods=['GET'])
@jwt_required()
def obtener_ejercicios():
    try:
        ejercicios_guardados = adaptar_ejercicios()
        
        return jsonify({"exito": True, "total_procesados": len(ejercicios_guardados)}), 200
        
    except Exception as e:
        return jsonify({"exito": False, "error": f"Error al obtener los ejercicios: {str(e)}"}), 500

@ejercicios_bp.route("/catalogo", methods=["GET"])
def obtener_catalogo():
    try:
        pagina = request.args.get('page', 1, type=int)
        por_pagina = request.args.get('limit', 12, type=int)
        categoria = request.args.get('categoria', None, type=str)
        busqueda = request.args.get('busqueda', None, type=str)
        
        paginacion = recibir_catalogo_paginado(pagina=pagina, por_pagina=por_pagina, categoria=categoria, busqueda=busqueda)
        
        ejerciciosJSON = []
        for ejercicio in paginacion.items:
            ejerciciosJSON.append(ejercicio.to_dict())
            
        return jsonify({
            "exito": True, 
            "total": len(ejerciciosJSON), 
            "resultados": ejerciciosJSON, 
            "meta": {"total_ejercicios": paginacion.total, "paginas_totales": paginacion.pages, "pagina_actual": paginacion.page, "tiene_siguiente": paginacion.has_next, "tiene_anterior": paginacion.has_prev}
        }), 200
    
    except EjerciciosNoEncontradosError as e:
        return jsonify({"exito": False, "error": str(e)}), 404
    except Exception as e:
        return jsonify({"exito": False, "error": f"Error al cargar el catálogo: {str(e)}"}), 500


@ejercicios_bp.route('/<int:id>', methods=['GET'])
def obtener_ejercicio_detalle(id):
    try:
        ejercicio = recibir_ejercicio_por_id(id)
        if not ejercicio:
            return jsonify({"exito": False, "error": f"Ejercicio no encontrado"}), 404

        return jsonify({
            "exito": True,
            "ejercicio": ejercicio.to_dict()
        }), 200
    except Exception as e:
        return jsonify({"exito": False, "error": f"Error al cargar el ejercicio: {str(e)}"}), 500

@ejercicios_bp.route('/buscar/<nombreBuscado>', methods=['GET'])
@jwt_required()
def buscar_ejercicios(nombreBuscado):
    try:
        ejerciciosEncontrados=buscar_ejercicio_por_nombre(nombreBuscado)
        ejerciciosJSON=[]
        for ejercicio in ejerciciosEncontrados:
            ejercicioJSON=ejercicio.to_dict()
            ejerciciosJSON.append(ejercicioJSON)
            
        return jsonify({"exito": True, "Se han encontrado": len(ejerciciosEncontrados), "resultados": ejerciciosJSON}), 200
    except Exception as e:
        return jsonify({"exito": False, "error": f"No se han encontrado ejercicios con el nombre {nombreBuscado}: {str(e)}"}), 404
    
@ejercicios_bp.route('/<id_api>/imagen', methods=['GET'])
def obtener_imagen(id_api):
    
    directorio_base=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    carpeta_imagenes=os.path.join(directorio_base, 'static', 'images')
    
    os.makedirs(carpeta_imagenes, exist_ok=True)
    ruta_archivo=os.path.join(carpeta_imagenes, f"{id_api}.gif")
    
    if os.path.exists(ruta_archivo):
        return send_file(ruta_archivo, mimetype="image/gif")
    
    
    try:
        imagen_bytes, content_type = fetch_imagen_ejercicio(id_api)
        with open(ruta_archivo, "wb") as archivo:
            archivo.write(imagen_bytes)
        return send_file(ruta_archivo, mimetype=content_type)
        
    except Exception as e:
        return jsonify({"exito": False ,"error": f"No se pudo cargar la imagen: {str(e)}"}), 500