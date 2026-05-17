import { CheckCircle2 } from 'lucide-react';

function EjercicioInstrucciones({ instrucciones }) {
  if (!instrucciones || instrucciones.length === 0) {
    return null;
  }

  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-white uppercase mb-6 tracking-wide">
        Instrucciones
      </h2>

      <div className="space-y-4">
        {instrucciones.map((instruccion, index) => (
          <div key={index} className="flex gap-4 items-start">
            <div className="flex-shrink-0 mt-1">
              <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" />
            </div>
            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed pt-0.5">
              {instruccion}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EjercicioInstrucciones;
