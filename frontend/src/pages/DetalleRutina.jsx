import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Plus, Trash2 } from 'lucide-react';
import api from '../services/api';

function DetalleRutina() {
  const { id } = useParams();

  // Solo los estados que realmente usamos en esta fase
  const [ejerciciosCatalogo, setEjerciciosCatalogo] = useState([]);
  const [ejerciciosRutina, setEjerciciosRutina] = useState([]);

  const cargarTodo = async () => {
    try {
      const resCat = await api.get('api/ejercicios/catalogo');
      if (resCat.data.exito) setEjerciciosCatalogo(resCat.data.resultados);

      const resRut = await api.get(`api/rutina/${id}/obtener-ejercicios`);
      if (resRut.data.exito) setEjerciciosRutina(resRut.data.ejercicios_rutina);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    cargarTodo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const agregarEjercicio = async (id_ejercicio) => {
    try {
      const res = await api.post(`api/rutina/${id}/añadir-ejercicio`, {
        ejercicio_id: id_ejercicio,
        series: 3,
        repeticiones: 8,
        peso: 0
      });
      if (res.data.exito)
        setEjerciciosRutina([...ejerciciosRutina, res.data.rutina_ejercicio]);
    } catch {
      alert('Error al añadir');
    }
  };

  const eliminarEjercicio = async (id_ejercicio) => {
    try {
      const res = await api.delete(
        `api/rutina/${id}/eliminar-ejercicio/${id_ejercicio}`
      );
      if (res.data.exito) {
        setEjerciciosRutina(
          ejerciciosRutina.filter((e) => e.ejercicio_id !== id_ejercicio)
        );
      }
    } catch {
      alert('Error al eliminar');
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] p-8 md:p-12">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl font-extrabold uppercase">
            Configurando Rutina #{id}
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* COLUMNA IZQUIERDA: CATÁLOGO */}
          <div className="bg-[var(--container)] rounded-[var(--radius-lg)] p-6 border border-[var(--primary-muted)] flex flex-col h-[750px] lg:col-span-1">
            <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
              {ejerciciosCatalogo.map((ejercicio) => (
                <div
                  key={ejercicio.id}
                  className="flex items-center gap-3 bg-[var(--card)] p-3 rounded-[var(--radius-md)]"
                >
                  <img
                    src={`http://127.0.0.1:5000${ejercicio.image_url}`}
                    alt={ejercicio.nombre}
                    className="w-14 h-14 bg-white rounded object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-sm truncate capitalize">
                      {ejercicio.nombre}
                    </h3>
                  </div>
                  <button
                    onClick={() => agregarEjercicio(ejercicio.id)}
                    className="text-[var(--primary)] hover:scale-110 transition-transform"
                  >
                    <Plus />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* COLUMNA DERECHA: RUTINA */}
          <div className="bg-[var(--background)] rounded-[var(--radius-md)] p-6 border border-[var(--primary-muted)] flex flex-col h-[750px] lg:col-span-2">
            <h2 className="text-xl font-bold mb-6 text-[var(--primary)]">
              Ejercicios en esta Rutina
            </h2>
            <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
              {ejerciciosRutina.length === 0 ? (
                <div className="flex h-full items-center justify-center opacity-50">
                  <p>Rutina Vacía</p>
                </div>
              ) : (
                ejerciciosRutina.map((item) => (
                  <div
                    key={item.ejercicio_id}
                    className="flex items-center gap-4 bg-[var(--card)] p-4 rounded-[var(--radius-md)]"
                  >
                    <img
                      src={`http://127.0.0.1:5000${item.ejercicio_detalle.image_url}`}
                      alt={item.ejercicio_detalle.nombre}
                      className="w-16 h-16 bg-white rounded object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-bold capitalize mb-1">
                        {item.ejercicio_detalle.nombre}
                      </h3>
                      <div className="flex gap-4">
                        <span className="text-[var(--muted-foreground)]">
                          <strong className="text-[var(--primary)]">
                            {item.series}
                          </strong>{' '}
                          Series
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => eliminarEjercicio(item.ejercicio_id)}
                      className="text-red-500 hover:text-red-400 transition-colors"
                    >
                      <Trash2 />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetalleRutina;
