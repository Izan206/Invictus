from app.models.usuario import Usuario
from app.services.usuario_service import recibir_usuario_por_username
from app.exceptions.exceptions import CredencialesInvalidasError

def autenticacion(username, password):
    usuario=recibir_usuario_por_username(username)
    if usuario and usuario.check_password(password):
        return usuario
    else:
        raise CredencialesInvalidasError("Usuario o contraseña incorrectos")