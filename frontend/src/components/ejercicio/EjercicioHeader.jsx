function EjercicioHeader({ ejercicio }) {
  const BACKEND_URL = import.meta.env.VITE_API_URL;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start mb-10">
      <div className="flex flex-col items-center justify-center">
        <div className="w-full h-64 sm:h-72 md:h-80 bg-white rounded-lg flex items-center justify-center p-4 overflow-hidden border border-primary-muted">
          <img
            src={`${BACKEND_URL}${ejercicio.image_url}`}
            alt={ejercicio.nombre}
            className="w-48 h-48 sm:w-56 sm:h-56 object-contain mix-blend-multiply"
          />
        </div>
      </div>

      <div className="flex flex-col justify-center space-y-6">
        <div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-wide text-white uppercase mb-4 break-words">
            {ejercicio.nombre}
          </h1>
          <p className="text-neutral-400 text-base sm:text-lg leading-relaxed">
            {ejercicio.descripcion}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <span className="h-9 px-5 bg-primary text-black text-xs sm:text-sm font-bold rounded-full uppercase tracking-wider flex items-center justify-center leading-none">
            {ejercicio.grupo_muscular}
          </span>
          <span className="h-9 px-5 border-2 border-[#00ffff] text-primary text-xs sm:text-sm font-bold rounded-full uppercase tracking-wider flex items-center justify-center leading-none">
            {ejercicio.dificultad}
          </span>
          {ejercicio.maquina && (
            <span className="h-9 px-5 bg-search text-foreground text-xs sm:text-sm font-bold rounded-full uppercase tracking-wider flex items-center justify-center leading-none">
              {ejercicio.maquina}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default EjercicioHeader;
