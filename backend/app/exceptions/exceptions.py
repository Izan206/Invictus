class CredencialesInvalidasError(Exception):
    """Usuario o la contraseña no coinciden."""
    pass

class DatosFaltantesError(Exception):
    """Faltan los datos obligatorios."""
    pass

class UsuarioExistenteError(Exception):
    """Registrar un username o email que ya existe."""
    pass

class APIError(Exception):
    """Error al obtener informacion de la API ExerciseDB"""
    pass

class EjercicioNoEncontradoError(Exception):
    """No se ha encontrado un ejercicio con ese nombre en BD"""
    pass

class EjercicioYaExistenteError(Exception):
    """El ejercicio ya existe en la base de datos"""
    pass