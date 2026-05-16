import { Edit3 } from 'lucide-react';

function RutinaHeader({
  rutinaInfo,
  editandoInfo,
  setEditandoInfo,
  datosInfoEdit,
  manejarCambioInfo,
  guardarInfoRutina,
  eliminarRutinaCompleta,
  musculosTrabajados
}) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start gap-6 relative group border-b border-primary-muted pb-8 mb-8">
      <div className="flex-1 w-full">
        {editandoInfo ? (
          <div className="flex flex-col gap-3 w-full max-w-[425px]">
            <input
              type="text"
              name="nombre"
              value={datosInfoEdit.nombre}
              onChange={manejarCambioInfo}
              className="text-xl sm:text-2xl font-bold bg-input border border-primary-muted p-2 rounded"
              placeholder="Nombre de la rutina"
            />
            <input
              type="text"
              name="dias"
              value={datosInfoEdit.dias}
              onChange={manejarCambioInfo}
              className="text-sm bg-input border border-primary-muted p-2 rounded"
              placeholder="Días (Ej: Lunes + Jueves)"
            />
            <textarea
              name="descripcion"
              value={datosInfoEdit.descripcion}
              onChange={manejarCambioInfo}
              className="text-sm bg-input border border-primary-muted p-2 rounded resize-none"
              placeholder="Descripción..."
              rows="2"
            />
            <div className="flex gap-2 mt-2">
              <button
                onClick={guardarInfoRutina}
                className="bg-primary text-black px-4 py-2 rounded font-bold hover:bg-primary-hover transition-colors"
              >
                Guardar
              </button>
              <button
                onClick={() => setEditandoInfo(false)}
                className="bg-search text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-start gap-4 mb-2">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-wide text-white max-w-[425px] break-words">
                {rutinaInfo.nombre || 'Rutina'}
              </h1>
              <button
                onClick={() => setEditandoInfo(true)}
                className="text-muted-foreground hover:text-primary opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all mt-2"
              >
                <Edit3 className="w-5 h-5" />
              </button>
            </div>
            {rutinaInfo.dias && (
              <p className="text-sm text-muted-foreground mb-3 max-w-[425px] break-words">
                Días: {rutinaInfo.dias}
              </p>
            )}
            {rutinaInfo.descripcion && (
              <div className="border-l-2 border-primary pl-3 max-w-[425px]">
                <p className="text-sm text-muted-foreground italic break-words">
                  {rutinaInfo.descripcion}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex flex-row flex-wrap items-center justify-start md:justify-end gap-4 w-full md:w-auto">
        {musculosTrabajados.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {musculosTrabajados.map((musculo, index) => (
              <span
                key={index}
                className="bg-primary text-black text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-[0_0_10px_rgba(0,255,255,0.2)]"
              >
                {musculo}
              </span>
            ))}
          </div>
        )}
        <button
          onClick={eliminarRutinaCompleta}
          className="bg-danger/20 text-danger border border-danger hover:bg-danger hover:text-white px-5 py-2 rounded-sm font-semibold transition-colors shrink-0"
        >
          Eliminar Rutina
        </button>
      </div>
    </div>
  );
}

export default RutinaHeader;
