from app.models.usuario import Usuario
from app.repositories.usuario_repo import añadir_usuario, obtener_usuario_por_username
from app.exceptions.exceptions import DatosFaltantesError, UsuarioExistenteError    

def recibir_usuario_por_username(username):
    if username=="" or username==None:
        return None
    usernameObtenido=obtener_usuario_por_username(username)
    return usernameObtenido

def crear_usuario(data):
    username=data.get("username")
    email=data.get("email")
    password=data.get("password")
    peso=data.get("peso")
    altura=data.get("altura")
    edad=data.get("edad")
    
    if not username or not email or not password:
        raise DatosFaltantesError("Faltan datos obligatorios (username email o password)")
    
    nuevoUsuario=Usuario(username=username, email=email, peso=peso, altura=altura, edad=edad)
    nuevoUsuario.set_password(password)
    try:
        añadir_usuario(nuevoUsuario)
        return nuevoUsuario
    except Exception as e:
        raise UsuarioExistenteError("El nombre de usuario o el email ya esta en uso")