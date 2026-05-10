import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Search, Plus } from 'lucide-react';
import api from '../services/api';

function DetalleRutina() {
  const { id } = useParams();
  const [busqueda, setBusqueda] = useState('');
  const [ejerciciosCatalogo, setEjerciciosCatalogo] = useState([]);
  const [cargandoCatalogo, setCargandoCatalogo] = useState(false);

  const buscarEjercicios = async (termino) => {
    setCargandoCatalogo(true);
    try {
      const url = termino
        ? `api/ejercicios/catalogo?busqueda=${termino}`
        : `api/ejercicios/catalogo`;
      const respuesta = await api.get(url);
      if (respuesta.data.exito)
        setEjerciciosCatalogo(respuesta.data.resultados);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setCargandoCatalogo(false);
    }
  };

  useEffect(() => {
    buscarEjercicios('');
  }, []);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] p-8 md:p-12">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl font-extrabold uppercase tracking-wide mb-2">
            Configurando Rutina #{id}
          </h1>
          <div className="h-1 w-24 bg-[var(--primary)] mb-2"></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="bg-[var(--container)] rounded-[var(--radius-lg)] p-6 border border-[var(--primary-muted)] flex flex-col h-[750px] lg:col-span-1">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                buscarEjercicios(busqueda);
              }}
              className="relative mb-6"
            >
              <input
                type="text"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Buscar press..."
                className="w-full bg-[var(--input)] border-transparent rounded-[var(--radius-md)] p-3 pl-12"
              />
              <Search className="absolute left-4 top-3.5 text-[var(--muted-foreground)] w-5 h-5" />
            </form>
            <div className="flex-1 overflow-y-auto pr-2 space-y-3">
              {cargandoCatalogo ? (
                <p className="text-center text-[var(--muted-foreground)] mt-10">
                  Cargando...
                </p>
              ) : (
                ejerciciosCatalogo.map((ejercicio) => (
                  <div
                    key={ejercicio.id}
                    className="flex items-center gap-3 bg-[var(--card)] p-3 rounded-[var(--radius-md)]"
                  >
                    <img
                      src={`http://127.0.0.1:5000${ejercicio.image_url}`}
                      alt={ejercicio.nombre}
                      className="w-14 h-14 object-cover rounded-[var(--radius-sm)] bg-white"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-sm truncate capitalize">
                        {ejercicio.nombre}
                      </h3>
                    </div>
                    <button className="p-1.5 text-[var(--primary)]">
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
          <div className="bg-[var(--background)] rounded-[var(--radius-md)] p-6 border border-[var(--primary-muted)] flex flex-col h-[750px] lg:col-span-2">
            <h2 className="text-xl font-bold mb-6 text-[var(--primary)]">
              Ejercicios en esta Rutina
            </h2>
            <div className="flex-1 flex items-center justify-center opacity-50">
              <p>Rutina Vacía</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default DetalleRutina;
