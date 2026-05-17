import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import api from '../services/api';
import EjercicioHeader from '../components/ejercicio/EjercicioHeader';
import EjercicioInstrucciones from '../components/ejercicio/EjercicioInstrucciones';

function DetalleEjercicio() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [ejercicio, setEjercicio] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarEjercicio = async () => {
      try {
        const respuesta = await api.get(`/api/ejercicios/${id}`);
        if (respuesta.data.exito) {
          setEjercicio(respuesta.data.ejercicio);
          window.scrollTo(0, 0);
        } else {
          setError('No se encontró el ejercicio');
        }
      } catch (err) {
        console.error('Error al cargar ejercicio:', err);
        setError('Error al cargar el ejercicio');
      } finally {
        setCargando(false);
      }
    };

    cargarEjercicio();
  }, [id]);

  if (cargando) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
      </div>
    );
  }

  if (error || !ejercicio) {
    return (
      <div className="min-h-screen bg-background text-foreground p-4 sm:p-8 md:p-12 pt-32">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => navigate('/catalogo')}
            className="flex items-center gap-2 text-primary hover:text-primary-hover mb-8 transition-colors font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver al catálogo
          </button>
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-8 text-center">
            <p className="text-red-500 text-lg font-medium">
              {error || 'Ejercicio no encontrado'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-4 sm:p-8 md:p-12 pt-32">
      <div className="max-w-7xl mx-auto space-y-6">
        <button
          onClick={() => navigate('/catalogo')}
          className="flex items-center gap-2 text-primary hover:text-primary-hover transition-colors font-medium"
        >
          <ArrowLeft className="w-5 h-5" />
          Volver al catálogo
        </button>

        <div className="bg-container border border-primary-muted rounded-lg p-6 sm:p-8 md:p-10 shadow-2xl">
          <EjercicioHeader ejercicio={ejercicio} />

          <div className="border-t border-primary-muted pt-10">
            <EjercicioInstrucciones instrucciones={ejercicio.instrucciones} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetalleEjercicio;
