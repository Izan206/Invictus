from flask import Blueprint, jsonify, request
from flask_jwt_extended import get_jwt_identity, jwt_required

from app.services.rutinas_services import recibir_rutina_por_id
from app.services.usuario_service import recibir_usuario_por_username
from app.exceptions.exceptions import EjercicioEnRutinaYaExistente, RutinaNoEncontradaError
from app.services.rutinaejercicio_service import añadir_ejercicio_a_rutina


rutinaejercicio_bp=Blueprint("rutinaejercicio", __name__)

@rutinaejercicio_bp.route("/<int:id_rutina>/añadir-ejercicio", methods=["POST"])
@jwt_required()
def añadir_ejercicio(id_rutina):
    data=request.get_json()
    try:
        usuarioActual=get_jwt_identity()
        usuarioBD=recibir_usuario_por_username(usuarioActual)
        rutina=recibir_rutina_por_id(id_rutina)
        
        if rutina.usuario_id==usuarioBD.id:
            rutina_ejercicio=añadir_ejercicio_a_rutina(id_rutina, data)
            return jsonify({"exito": True, "mensaje": "Se ha añadido correctamente el ejercicio a la rutina", "rutina_ejercicio": rutina_ejercicio.to_dict()}), 201
        else:
            return jsonify({"exito": False, "error": "Acceso denegado"}), 403
    except EjercicioEnRutinaYaExistente as e:
        return jsonify({"exito": False, "error": str(e)}), 409
    except RutinaNoEncontradaError as e:
        return jsonify({"exito": False, "error": str(e)}), 404
    except Exception as e:
        return jsonify({"exito": False, "error": str(e)}), 500