from app.models.usuario import Usuario
from app.repositories.usuario_repo import añadir_usuario, obtener_usuario_por_email, obtener_usuario_por_id, obtener_usuario_por_username, guardar_cambios
from app.exceptions.exceptions import DatosFaltantesError, UsuarioExistenteError, UsuarioNoEncontradoError    

def recibir_usuario_por_username(username):
    if username=="" or username==None:
        return None
    usernameObtenido=obtener_usuario_por_username(username)
    return usernameObtenido

def recibir_usuario_por_email(email):
    if email=="" or email==None:
        return None
    emailObtenido=obtener_usuario_por_email(email)
    return emailObtenido

def crear_usuario(data):
    username=data.get("username")
    email=data.get("email")
    password=data.get("password")
    peso=data.get("peso")
    altura=data.get("altura")
    edad=data.get("edad")
    
    if not username or not email or not password:
        raise DatosFaltantesError("Faltan datos obligatorios. Rellena todos los campos.")
    
    if len(password)<3:
        raise DatosFaltantesError("La contraseña debe tener al menos 3 caracteres.")
    
    usuarioUsername=obtener_usuario_por_username(username)
    if usuarioUsername:
        raise UsuarioExistenteError(f"El nombre de usuario '{username}' ya está en uso.")
    
    usuarioEmail=obtener_usuario_por_email(email)
    if usuarioEmail:
        raise UsuarioExistenteError(f"El usuario con email '{email}' ya existe.")
    
    nuevoUsuario=Usuario(username=username, email=email, peso=peso, altura=altura, edad=edad)
    nuevoUsuario.set_password(password)
    try:
        añadir_usuario(nuevoUsuario)
        return nuevoUsuario
    except Exception as e:
        raise Exception(f"Error interno del servidor: {e}")

def recibir_usuario_por_id(usuario_id):
    usuario=obtener_usuario_por_id(usuario_id)
    if usuario:
        return usuario
    else:
        raise UsuarioNoEncontradoError(f"No se ha encontrado ningun usuario con el id {usuario_id}")
    

def actualizar_perfil_usuario(username, data):
    usuario = obtener_usuario_por_username(username)
    if not usuario:
        raise UsuarioNoEncontradoError("Usuario no encontrado")

    if 'peso' in data:
        usuario.peso = data.get('peso')
    if 'altura' in data:
        usuario.altura = data.get('altura')
    if 'edad' in data:
        usuario.edad = data.get('edad')

    try:
        guardar_cambios()
        return usuario
    except Exception as e:
        raise Exception(f"Error al actualizar el perfil: {e}")