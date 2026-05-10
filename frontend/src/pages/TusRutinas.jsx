import { useState, useEffect } from 'react';
import { Plus, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import RutinaCard from '../components/rutinas/RutinaCard';

function TusRutinas() {
  const [rutinas, setRutinas] = useState([]);
  const [cargando, setCargando] = useState(true);

  const [modalAbierto, setModalAbierto] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [datosFormulario, setDatosFormulario] = useState({
    nombre: '',
    dias: '',
    descripcion: ''
  });

  const navigate = useNavigate();

  const cargarRutinas = async () => {
    try {
      const respuesta = await api.get('api/rutinas/mis-rutinas');
      if (respuesta.data.exito) {
        setRutinas(respuesta.data.rutinas);
      }
    } catch (error) {
      console.error('Error al cargar las rutinas:', error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarRutinas();
  }, []);

  const manejarCambio = (e) => {
    setDatosFormulario({
      ...datosFormulario,
      [e.target.name]: e.target.value
    });
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();
    setGuardando(true);
    try {
      const respuesta = await api.post(
        'api/rutinas/crear_rutina',
        datosFormulario
      );
      if (respuesta.data.exito) {
        setModalAbierto(false);
        setDatosFormulario({ nombre: '', dias: '', descripcion: '' });
        const nuevaRutinaId = respuesta.data.results.id;
        navigate(`/rutinas/${nuevaRutinaId}`);
      }
    } catch (error) {
      console.error('Error al crear la rutina:', error);
      alert('Hubo un error al crear la rutina');
    } finally {
      setGuardando(false);
    }
  };

  const manejarEliminar = async (idRutina) => {
    const confirmar = window.confirm(
      '¿Estás seguro de que quieres eliminar esta rutina?'
    );

    if (confirmar) {
      try {
        const respuesta = await api.delete(
          `api/rutinas/eliminar-rutina/${idRutina}`
        );
        if (respuesta.data.exito) {
          setRutinas(rutinas.filter((rutina) => rutina.id !== idRutina));
        }
      } catch (error) {
        console.error('Error al eliminar la rutina:', error);
        alert('Hubo un error al eliminar la rutina');
      }
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] p-8 md:p-12 relative">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl font-extrabold uppercase tracking-wide">
            Tus Rutinas
          </h1>
          <div className="h-1 w-24 bg-[var(--primary)] mt-2"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            onClick={() => setModalAbierto(true)}
            className="bg-[var(--create)] rounded-[var(--radius-lg)] p-6 min-h-[200px] flex flex-col items-center justify-center cursor-pointer hover:border-[var(--primary)] border border-transparent transition-all group"
          >
            <div className="w-16 h-16 rounded-full border border-[var(--primary)] flex items-center justify-center mb-4 text-[var(--primary)] group-hover:scale-110 transition-transform">
              <Plus className="w-8 h-8" />
            </div>
            <p className="font-bold text-lg">Crear Nueva</p>
          </div>

          {cargando ? (
            <p className="text-[var(--muted-foreground)] mt-4">
              Cargando tus rutinas...
            </p>
          ) : (
            rutinas.map((rutina, index) => (
              <RutinaCard
                key={rutina.id}
                rutina={rutina}
                index={index}
                alEliminar={manejarEliminar}
              />
            ))
          )}
        </div>
      </div>

      {modalAbierto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[var(--container)] rounded-[var(--radius-lg)] w-full max-w-md p-8 border border-[var(--search)] shadow-2xl relative animate-fade-in-up">
            <button
              onClick={() => setModalAbierto(false)}
              className="absolute top-5 right-5 text-[var(--muted-foreground)] hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold mb-6 text-white uppercase tracking-wide">
              Nueva Rutina
            </h2>
            <form onSubmit={manejarEnvio} className="flex flex-col gap-5">
              <div>
                <label className="block text-sm font-medium text-[var(--muted-foreground)] mb-2">
                  Nombre de la Rutina
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={datosFormulario.nombre}
                  onChange={manejarCambio}
                  required
                  placeholder="Ej: Torso / Pierna"
                  className="bg-[var(--input)] text-[var(--foreground)] border border-transparent rounded-[var(--radius-sm)] p-3 w-full focus:outline-none focus:border-[var(--primary-muted)] transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--muted-foreground)] mb-2">
                  Días de Entrenamiento
                </label>
                <input
                  type="text"
                  name="dias"
                  value={datosFormulario.dias}
                  onChange={manejarCambio}
                  placeholder="Ej: Lunes + Jueves"
                  className="bg-[var(--input)] text-[var(--foreground)] border border-transparent rounded-[var(--radius-sm)] p-3 w-full focus:outline-none focus:border-[var(--primary-muted)] transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--muted-foreground)] mb-2">
                  Descripción
                </label>
                <textarea
                  name="descripcion"
                  value={datosFormulario.descripcion}
                  onChange={manejarCambio}
                  placeholder="Añade algún detalle u objetivo..."
                  rows="3"
                  className="bg-[var(--input)] text-[var(--foreground)] border border-transparent rounded-[var(--radius-sm)] p-3 w-full focus:outline-none focus:border-[var(--primary-muted)] transition-colors resize-none"
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={guardando}
                className="w-full mt-2 bg-[var(--primary)] text-black font-bold py-3 rounded-[var(--radius-md)] hover:bg-black/30 border border-primary transition-colors duration-[0.4s] hover:text-primary disabled:opacity-50"
              >
                {guardando ? 'Guardando...' : 'Crear Rutina'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default TusRutinas;
