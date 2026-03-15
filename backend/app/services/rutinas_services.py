from app.exceptions.exceptions import CrearRutinaError
from app.models.rutina import Rutina
from app.repositories.rutina_repo import añadir_rutina


def crear_rutina(nombre, descripcion, dias, usuario_id):
    rutina = Rutina(nombre=nombre, descripcion=descripcion, dias=dias, usuario_id=usuario_id)
    try:
        añadir_rutina(rutina)
        return rutina
    except Exception as e:
        raise CrearRutinaError(f"Error al crear la rutina {nombre}: {str(e)}")
    