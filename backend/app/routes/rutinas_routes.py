
from flask import Blueprint, jsonify, request
from flask_jwt_extended import get_jwt_identity, jwt_required

from app.exceptions.exceptions import CrearRutinaError
from app.services.rutinas_services import crear_rutina
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