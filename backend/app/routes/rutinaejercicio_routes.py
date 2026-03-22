from flask import Blueprint, jsonify, request
from flask_jwt_extended import get_jwt_identity, jwt_required

from app.services.rutinas_services import recibir_rutina_por_id
from app.services.usuario_service import recibir_usuario_por_username
from app.exceptions.exceptions import EjercicioEnRutinaYaExistente, EjercicioNoEnRutinaError, RutinaNoEncontradaError
from app.services.rutinaejercicio_service import actualizar_ejercicio_en_rutina, añadir_ejercicio_a_rutina, eliminar_ejercicio_de_rutina, recibir_ejercicios_por_rutina, recibir_rutinaejercicio_por_idrutina_y_idejercicio


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
  
@rutinaejercicio_bp.route("/<int:id_rutina>/obtener-ejercicios", methods=["GET"])
@jwt_required()
def obtener_ejercicios(id_rutina):
    try:
        usuarioActual=get_jwt_identity()
        usuarioBD=recibir_usuario_por_username(usuarioActual)
        rutina=recibir_rutina_por_id(id_rutina)
        
        if rutina.usuario_id==usuarioBD.id:
            ejercicios_rutina=recibir_ejercicios_por_rutina(id_rutina)
            ejercicios_json = []
            for ejercicio in ejercicios_rutina:
                ejercicios_json.append(ejercicio.to_dict())
            return jsonify({"exito": True, "mensaje": "Se han obtenido correctamente los ejercicios de tu rutina", "ejercicios_rutina": ejercicios_json}), 200
        
        else:
            return jsonify({"exito": False, "error": "Acceso denegado"}), 403
    except RutinaNoEncontradaError as e:
        return jsonify({"exito": False, "error": str(e)}), 404
    except Exception as e:
        return jsonify({"exito": False, "error": str(e)}), 500

@rutinaejercicio_bp.route("/<int:id_rutina>/eliminar-ejercicio/<int:id_ejercicio>", methods=["DELETE"])
@jwt_required()
def eliminar_ejercicio(id_rutina, id_ejercicio):
    try:
        usuarioActual=get_jwt_identity()
        usuarioBD=recibir_usuario_por_username(usuarioActual)
        rutina=recibir_rutina_por_id(id_rutina)
        rutina_ejercicio=recibir_rutinaejercicio_por_idrutina_y_idejercicio(id_rutina, id_ejercicio)
        if rutina.usuario_id==usuarioBD.id:
            eliminar_ejercicio_de_rutina(rutina_ejercicio)
            return jsonify({"exito": True, "mensaje": f"Se ha eliminado correctamente", "rutina_ejercicio_eliminado": rutina_ejercicio.to_dict()}), 200
        else:
            return jsonify({"exito": False, "error": "Acceso denegado"}), 403
    except EjercicioNoEnRutinaError as e:
        return jsonify({"exito": False, "error": str(e)}), 404
    except RutinaNoEncontradaError as e:
        return jsonify({"exito": False, "error": str(e)}), 404
    except Exception as e:
        return jsonify({"exito": False, "error": str(e)}), 500
    
@rutinaejercicio_bp.route("/<int:id_rutina>/editar-ejercicio/<int:id_ejercicio>", methods=["PUT"])
@jwt_required()
def editar_ejercicio(id_rutina, id_ejercicio):
    data = request.get_json()
    try:
        usuarioActual = get_jwt_identity()
        usuarioBD = recibir_usuario_por_username(usuarioActual)
        rutina = recibir_rutina_por_id(id_rutina)
        
        if rutina.usuario_id == usuarioBD.id:
            ejercicio_editado = actualizar_ejercicio_en_rutina(id_rutina, id_ejercicio, data)
            return jsonify({"exito": True, "mensaje": "Ejercicio actualizado correctamente", "rutina_ejercicio": ejercicio_editado.to_dict()}), 200
        else:
            return jsonify({"exito": False, "error": "Acceso denegado"}), 403

    except EjercicioNoEnRutinaError as e:
        return jsonify({"exito": False, "error": str(e)}), 404
    except RutinaNoEncontradaError as e:
        return jsonify({"exito": False, "error": str(e)}), 404
    except Exception as e:
        return jsonify({"exito": False, "error": str(e)}), 500