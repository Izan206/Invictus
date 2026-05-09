from flask import Blueprint, jsonify, request

from app.exceptions.exceptions import CredencialesInvalidasError, DatosFaltantesError, UsuarioExistenteError
from app.models.usuario import Usuario
from app.services.auth_service import autenticacion
from app.services.usuario_service import crear_usuario
from flask_jwt_extended import create_access_token, jwt_required

auth_bp=Blueprint("auth", __name__)

@auth_bp.route("/register", methods=["POST"])
def register():
    data=request.get_json()
    if not data or data is None or data=="":
        return jsonify({"exito": False, "error": "Ausencia de datos."}), 400
    
    try:
        nuevoUsuario=crear_usuario(data)
        return jsonify({"exito": True, "usuario": nuevoUsuario.username}),201
    except DatosFaltantesError as e:
        return jsonify({"exito": False, "error": str(e)}), 400
    except UsuarioExistenteError as e:
        return jsonify({"exito": False, "error": str(e)}), 409
    except Exception as e:
        return jsonify({"exito": False, "error": "Error interno del servidor"}), 500
    
@auth_bp.route("/login", methods=["POST"])
def login():
    data=request.get_json()
    if not data or data is None or data=="":
        return jsonify({"exito": False, "error": "Ausencia de datos"}), 400
    
    email=data.get("email")
    password_introducida=data.get("password")
    
    try:
        usuario=autenticacion(email, password_introducida)
        token_usuario=create_access_token(identity=usuario.username)
        return jsonify({"exito": True, "usuario": usuario.email, "username": usuario.username, "token": token_usuario}), 200
    except CredencialesInvalidasError as e:
        return jsonify({"exito": False, "error": str(e)}), 401

@auth_bp.route("/logout", methods=["POST"])
@jwt_required()
def logout():
    return jsonify({"exito": True, "mensaje": "Has cerrado sesión correctamente"}), 200
    
    