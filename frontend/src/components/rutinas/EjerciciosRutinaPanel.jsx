import { DndContext, closestCenter } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
import EjercicioOrdenadoItem from './EjercicioOrdenadoItem';

function EjerciciosRutinaPanel({
  cargandoRutina,
  ejerciciosRutina,
  editandoId,
  datosEdicion,
  manejarCambioEdicion,
  guardarEdicion,
  cancelarEdicion,
  iniciarEdicion,
  eliminarEjercicioDeRutina,
  manejarDragEnd
}) {
  const ejerciciosValidos = ejerciciosRutina.filter(
    (item) => item && item.ejercicio_id && item.ejercicio_detalle
  );

  const itemsIds = ejerciciosValidos.map((item) => item.ejercicio_id);

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
          <DndContext
            collisionDetection={closestCenter}
            onDragEnd={manejarDragEnd}
          >
            <SortableContext
              items={itemsIds}
              strategy={verticalListSortingStrategy}
            >
              {ejerciciosValidos.map((item) => (
                <EjercicioOrdenadoItem
                  key={item.ejercicio_id}
                  item={item}
                  editandoId={editandoId}
                  datosEdicion={datosEdicion}
                  manejarCambioEdicion={manejarCambioEdicion}
                  guardarEdicion={guardarEdicion}
                  cancelarEdicion={cancelarEdicion}
                  iniciarEdicion={iniciarEdicion}
                  eliminarEjercicioDeRutina={eliminarEjercicioDeRutina}
                />
              ))}
            </SortableContext>
          </DndContext>
        )}
      </div>
    </div>
  );
}

export default EjerciciosRutinaPanel;
