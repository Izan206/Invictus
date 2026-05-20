import { Search, Plus } from 'lucide-react';

function CatalogoPanel({
  busqueda,
  setBusqueda,
  manejarBusqueda,
  cargandoCatalogo,
  ejerciciosCatalogo,
  agregarEjercicioARutina
}) {
  return (
    <div className="bg-[#222D2F] rounded-md p-4 sm:p-6 border border-primary-muted flex flex-col h-[400px] md:h-[500px] lg:h-[750px] lg:col-span-1">
      <form onSubmit={manejarBusqueda} className="relative mb-6">
        <input
          type="text"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="Buscar press..."
          className="w-full bg-input text-foreground border border-transparent rounded-md p-3 pl-12 focus:outline-none focus:border-primary-muted transition-colors"
        />
        <Search className="absolute left-4 top-3.5 text-muted-foreground w-5 h-5" />
        <button type="submit" className="hidden">
          Buscar
        </button>
      </form>

      <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
        {cargandoCatalogo ? (
          <p className="text-center text-muted-foreground mt-10">Cargando...</p>
        ) : ejerciciosCatalogo.length === 0 ? (
          <p className="text-center text-muted-foreground mt-10">
            No se encontraron ejercicios.
          </p>
        ) : (
          ejerciciosCatalogo.map((ejercicio) => (
            <div
              key={ejercicio.id}
              className="flex items-center gap-3 bg-card p-3 rounded-md border border-transparent hover:border-primary-muted transition-colors group"
            >
              <img
                src={`${import.meta.env.VITE_API_URL}${ejercicio.image_url}`}
                alt={ejercicio.nombre}
                className="w-12 h-12 sm:w-14 sm:h-14 object-cover rounded-sm bg-white flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-xs sm:text-sm truncate capitalize">
                  {ejercicio.nombre}
                </h3>
                <p className="text-[10px] text-muted-foreground uppercase mt-1">
                  {ejercicio.grupo_muscular}
                </p>
              </div>
              <button
                onClick={() => agregarEjercicioARutina(ejercicio.id)}
                className="p-1.5 text-primary hover:bg-primary hover:text-black rounded-sm transition-colors flex-shrink-0"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CatalogoPanel;
