class CredencialesInvalidasError(Exception):
    """Usuario o la contraseña no coinciden."""
    pass

class DatosFaltantesError(Exception):
    """Faltan los datos obligatorios."""
    pass

class UsuarioExistenteError(Exception):
    """Registrar un username o email que ya existe."""
    pass