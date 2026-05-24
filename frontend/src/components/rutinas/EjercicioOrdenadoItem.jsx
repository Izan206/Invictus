import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  Save,
  X as CloseIcon,
  Edit2,
  Trash2,
  GripVertical
} from 'lucide-react';

function EjercicioOrdenadoItem({
  item,
  editandoId,
  datosEdicion,
  manejarCambioEdicion,
  guardarEdicion,
  cancelarEdicion,
  iniciarEdicion,
  eliminarEjercicioDeRutina
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: item.ejercicio_id
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  const isEditing = editandoId === item.ejercicio_id;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 bg-card p-4 rounded-md border border-transparent hover:border-search transition-colors relative"
    >
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab hover:text-primary text-muted-foreground transition-colors"
      >
        <GripVertical className="w-6 h-6" />
      </div>

      <img
        src={`${import.meta.env.VITE_API_URL}${item.ejercicio_detalle.image_url}`}
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
              <strong className="text-primary">{item.series}</strong> Series
            </span>
            <span className="text-xs sm:text-sm text-muted-foreground">
              <strong className="text-primary">{item.repeticiones}</strong> Reps
            </span>
            <span className="text-xs sm:text-sm text-muted-foreground">
              <strong className="text-primary">{item.peso || 0}</strong> kg
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
              onClick={() => eliminarEjercicioDeRutina(item.ejercicio_id)}
              className="p-2 bg-red-900/20 text-red-500 hover:bg-red-600 hover:text-white rounded transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default EjercicioOrdenadoItem;
