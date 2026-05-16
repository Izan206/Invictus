import { Trash2, Edit2, Save, X as CloseIcon } from 'lucide-react';

function EjerciciosRutinaPanel({
  cargandoRutina,
  ejerciciosRutina,
  editandoId,
  datosEdicion,
  manejarCambioEdicion,
  guardarEdicion,
  cancelarEdicion,
  iniciarEdicion,
  eliminarEjercicioDeRutina
}) {
  return (
    <div className="bg-[#222D2F] rounded-md p-4 sm:p-6 border border-primary-muted flex flex-col h-[500px] md:h-[600px] lg:h-[750px] lg:col-span-2">
      <h2 className="text-lg sm:text-xl font-bold mb-6 text-primary uppercase tracking-wide">
        Ejercicios en esta Rutina
      </h2>

      <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
        {cargandoRutina ? (
          <div className="flex flex-col items-center justify-center h-full opacity-50">
            <p className="text-foreground font-medium text-lg">
              Cargando tu rutina...
            </p>
          </div>
        ) : ejerciciosRutina.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center opacity-50">
            <p className="text-foreground font-medium text-base sm:text-lg mb-2">
              Rutina Vacía
            </p>
            <p className="text-muted-foreground text-sm max-w-[250px]">
              Usa el buscador y pulsa el botón "+" para construir tu
              entrenamiento.
            </p>
          </div>
        ) : (
          ejerciciosRutina.map((item) => {
            const isEditing = editandoId === item.ejercicio_id;

            return (
              <div
                key={item.ejercicio_id}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 bg-card p-4 rounded-md border border-transparent hover:border-search transition-colors"
              >
                <img
                  src={`http://127.0.0.1:5000${item.ejercicio_detalle.image_url}`}
                  alt={item.ejercicio_detalle.nombre}
                  className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-md bg-white flex-shrink-0"
                />

                <div className="flex-1 min-w-0 w-full sm:w-auto">
                  <h3 className="font-bold text-sm sm:text-base capitalize mb-1">
                    {item.ejercicio_detalle.nombre}
                  </h3>

                  {isEditing ? (
                    <div className="flex flex-wrap gap-3 mt-2">
                      <div className="flex flex-col">
                        <label className="text-[10px] text-muted-foreground uppercase">
                          Series
                        </label>
                        <input
                          type="number"
                          name="series"
                          value={datosEdicion.series}
                          onChange={manejarCambioEdicion}
                          className="w-16 bg-input text-white p-1 rounded text-sm text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="text-[10px] text-muted-foreground uppercase">
                          Reps
                        </label>
                        <input
                          type="number"
                          name="repeticiones"
                          value={datosEdicion.repeticiones}
                          onChange={manejarCambioEdicion}
                          className="w-16 bg-input text-white p-1 rounded text-sm text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="text-[10px] text-muted-foreground uppercase">
                          Peso (kg)
                        </label>
                        <input
                          type="number"
                          step="0.5"
                          name="peso"
                          value={datosEdicion.peso}
                          onChange={manejarCambioEdicion}
                          className="w-20 bg-input text-white p-1 rounded text-sm text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-4 mt-2">
                      <span className="text-xs sm:text-sm text-muted-foreground">
                        <strong className="text-primary">{item.series}</strong>{' '}
                        Series
                      </span>
                      <span className="text-xs sm:text-sm text-muted-foreground">
                        <strong className="text-primary">
                          {item.repeticiones}
                        </strong>{' '}
                        Reps
                      </span>
                      <span className="text-xs sm:text-sm text-muted-foreground">
                        <strong className="text-primary">
                          {item.peso || 0}
                        </strong>{' '}
                        kg
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex gap-2 self-end sm:self-auto mt-2 sm:mt-0">
                  {isEditing ? (
                    <>
                      <button
                        onClick={() => guardarEdicion(item.ejercicio_id)}
                        className="p-2 bg-green-600/20 text-green-500 hover:bg-green-600 hover:text-white rounded transition-colors"
                      >
                        <Save className="w-4 h-4" />
                      </button>
                      <button
                        onClick={cancelarEdicion}
                        className="p-2 bg-gray-600/20 text-gray-400 hover:bg-gray-600 hover:text-white rounded transition-colors"
                      >
                        <CloseIcon className="w-4 h-4" />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => iniciarEdicion(item)}
                        className="p-2 bg-search text-foreground hover:text-primary rounded transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() =>
                          eliminarEjercicioDeRutina(item.ejercicio_id)
                        }
                        className="p-2 bg-red-900/20 text-red-500 hover:bg-red-600 hover:text-white rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default EjerciciosRutinaPanel;
