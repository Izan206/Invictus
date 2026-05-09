import { Trash2 } from 'lucide-react';

function RutinaCard({ rutina, index }) {
  return (
    <div className="bg-[var(--container)] rounded-[var(--radius-lg)] p-6 relative group border border-transparent hover:border-[var(--search)] transition-colors flex flex-col">
      <button className="absolute top-5 right-5 text-[var(--muted-foreground)] hover:text-[var(--danger)] transition-colors opacity-0 group-hover:opacity-100">
        <Trash2 className="w-5 h-5" />
      </button>

      <div className="flex flex-col gap-1.5 mt-2">
        <p className="text-[var(--primary)] font-bold text-sm tracking-wide uppercase">
          RUTINA {index + 1}
        </p>
        <h2 className="text-3xl font-bold text-[var(--foreground)] leading-tight break-words">
          {rutina.nombre}
        </h2>
        <p className="text-[var(--muted-foreground)] text-base font-medium">
          {rutina.dias || 'Sin días asignados'}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mt-6">
        <span className="bg-[var(--primary)] text-black text-sm font-semibold px-3 py-1.5 rounded-[var(--radius-sm)]">
          X
        </span>
      </div>
    </div>
  );
}

export default RutinaCard;
