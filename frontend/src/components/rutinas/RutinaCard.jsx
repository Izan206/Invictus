import { Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function RutinaCard({ rutina, index, alEliminar }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/rutinas/rutina/${rutina.id}`)}
      className="bg-container rounded-lg p-6 relative group border border-transparent hover:border-primary-muted transition-all flex flex-col cursor-pointer hover:shadow-[0_0_15px_rgba(0,255,255,0.1)]"
    >
      <button
        onClick={(e) => {
          e.stopPropagation(); // esto va a evitar que al pulsar la papelera se abra la rutina
          alEliminar(rutina.id);
        }}
        className="absolute top-5 right-5 text-muted-foreground hover:text-danger transition-colors opacity-0 group-hover:opacity-100 z-10 p-2"
      >
        <Trash2 className="w-5 h-5" />
      </button>

      <div className="flex flex-col gap-1.5 mt-2">
        <p className="text-primary font-bold text-sm tracking-wide uppercase">
          RUTINA {index + 1}
        </p>
        <h2 className="text-3xl font-bold text-foreground leading-tight break-words">
          {rutina.nombre}
        </h2>
        <p className="text-muted-foreground text-base font-medium">
          {rutina.dias || 'Sin días asignados'}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mt-6">
        <span className="bg-transparent border border-primary text-primary text-sm font-semibold px-3 py-1.5 rounded-sm group-hover:bg-primary group-hover:text-black transition-colors">
          Configurar Rutina
        </span>
      </div>
    </div>
  );
}

export default RutinaCard;
