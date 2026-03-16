
from flask import Blueprint, jsonify, request
from flask_jwt_extended import get_jwt_identity, jwt_required

from app.exceptions.exceptions import CrearRutinaError, RutinaNoEncontradaError
from app.services.rutinas_services import crear_rutina, recibir_rutina_por_id, recibir_rutinas_por_usuario
from app.services.usuario_service import recibir_usuario_por_username


rutinas_bp=Blueprint("rutinas", __name__)

@rutinas_bp.route("/crear_rutina", methods=["POST"])
@jwt_required()
def crear_rutinas():
    try:
        data=request.get_json()
        nombre=data.get("nombre")
        descripcion=data.get("descripcion")
        dias=data.get("dias")
        
        usuarioActual=get_jwt_identity()
        usuarioBD=recibir_usuario_por_username(usuarioActual)
        
        rutina=crear_rutina(nombre, descripcion, dias, usuarioBD.id)
        
        return jsonify({"exito": True, "mensaje": f"Se ha creado la rutina {nombre} con exito.", "results": rutina.to_dict()}), 201
    except CrearRutinaError as e:
        return jsonify({"exito": False, "error": str(e)}), 500

 
@rutinas_bp.route("/mis-rutinas", methods=["GET"])
@jwt_required()
def ver_mis_rutinas():
    try:
        usuarioActual=get_jwt_identity()
        usuarioBD=recibir_usuario_por_username(usuarioActual)
        
        rutinasUsuario = recibir_rutinas_por_usuario(usuarioBD.id)
        
        rutinasJSON=[]
        for rutina in rutinasUsuario:
            rutinaJSON=rutina.to_dict()
            rutinasJSON.append(rutinaJSON)
        
        return jsonify({"exito": True, "mensaje": "Se han obtenido las rutinas con exito", "rutinas": rutinasJSON}), 200
    except Exception as e:
        return jsonify({"exito": False, "error": f"{str(e)}"}), 500
    
    
    
       
@rutinas_bp.route("/rutina/<int:id_rutina>", methods=["GET"])
@jwt_required()
def ver_rutina(id_rutina):
    try:
        rutina=recibir_rutina_por_id(id_rutina)
        usuarioActual = get_jwt_identity()
        usuarioBD=recibir_usuario_por_username(usuarioActual)
        if rutina.usuario_id==usuarioBD.id:
            return jsonify({"exito": True, "mensaje": "Rutina encontrada con exito", "rutina": rutina.to_dict()}), 200
        else:
            return jsonify({"exito": False, "error": "Acceso denegado"}), 403
        
    except RutinaNoEncontradaError as e:
        return jsonify({"exito": False, "error": f"No se ha encontrado la rutina: {str(e)}"}), 404