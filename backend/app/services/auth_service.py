from app.models.usuario import Usuario
from app.services.usuario_service import recibir_usuario_por_email
from app.exceptions.exceptions import CredencialesInvalidasError

def autenticacion(email, password):
    usuario=recibir_usuario_por_email(email)
    if usuario and usuario.check_password(password):
        return usuario
    else:
        raise CredencialesInvalidasError("Email o contraseña incorrectos")