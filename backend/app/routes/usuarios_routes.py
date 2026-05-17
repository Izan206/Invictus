from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.services.usuario_service import recibir_usuario_por_username, actualizar_perfil_usuario

usuarios_bp = Blueprint("usuarios", __name__)

@usuarios_bp.route("/perfil", methods=["GET"])
@jwt_required()
def obtener_perfil():
    username = get_jwt_identity()
    try:
        usuario = recibir_usuario_por_username(username)
        if not usuario:
            return jsonify({"exito": False, "error": "Usuario no encontrado"}), 404
            
        return jsonify({"exito": True, "perfil": usuario.to_dict()}), 200
    except Exception as e:
        return jsonify({"exito": False, "error": str(e)}), 500

@usuarios_bp.route("/perfil", methods=["PUT"])
@jwt_required()
def actualizar_perfil():
    username = get_jwt_identity()
    data = request.get_json()
    
    try:
        usuario_actualizado = actualizar_perfil_usuario(username, data)
        return jsonify({"exito": True, "mensaje": "Perfil actualizado", "perfil": usuario_actualizado.to_dict()}), 200
    except Exception as e:
        return jsonify({"exito": False, "error": str(e)}), 500