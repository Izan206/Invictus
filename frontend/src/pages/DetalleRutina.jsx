import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Search,
  Plus,
  Trash2,
  Edit2,
  Save,
  X as CloseIcon,
  Edit3
} from 'lucide-react';
import api from '../services/api';

function DetalleRutina() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [rutinaInfo, setRutinaInfo] = useState({
    nombre: '',
    dias: '',
    descripcion: ''
  });
  const [editandoInfo, setEditandoInfo] = useState(false);
  const [datosInfoEdit, setDatosInfoEdit] = useState({
    nombre: '',
    dias: '',
    descripcion: ''
  });

  const [busqueda, setBusqueda] = useState('');
  const [ejerciciosCatalogo, setEjerciciosCatalogo] = useState([]);
  const [cargandoCatalogo, setCargandoCatalogo] = useState(false);

  const [ejerciciosRutina, setEjerciciosRutina] = useState([]);
  const [cargandoRutina, setCargandoRutina] = useState(true);

  const [editandoId, setEditandoId] = useState(null);
  const [datosEdicion, setDatosEdicion] = useState({
    series: '',
    repeticiones: '',
    peso: ''
  });

  const cargarInfoRutina = async () => {
    try {
      const respuesta = await api.get(`api/rutinas/rutina/${id}`);
      if (respuesta.data.exito) {
        setRutinaInfo(respuesta.data.rutina);
        setDatosInfoEdit({
          nombre: respuesta.data.rutina.nombre || '',
          dias: respuesta.data.rutina.dias || '',
          descripcion: respuesta.data.rutina.descripcion || ''
        });
      }
    } catch (error) {
      console.error('Error al cargar la información de la rutina:', error);
    }
  };

  const buscarEjercicios = async (termino) => {
    setCargandoCatalogo(true);
    try {
      const url = termino
        ? `api/ejercicios/catalogo?busqueda=${termino}`
        : `api/ejercicios/catalogo`;

      const respuesta = await api.get(url);
      if (respuesta.data.exito) {
        setEjerciciosCatalogo(respuesta.data.resultados);
      }
    } catch (error) {
      console.error('Error al buscar ejercicios:', error);
    } finally {
      setCargandoCatalogo(false);
    }
  };

  const cargarEjerciciosRutina = async () => {
    try {
      const respuesta = await api.get(`api/rutina/${id}/obtener-ejercicios`);
      if (respuesta.data.exito) {
        setEjerciciosRutina(respuesta.data.ejercicios_rutina);
      }
    } catch (error) {
      console.error('Error al cargar ejercicios de la rutina:', error);
    } finally {
      setCargandoRutina(false);
    }
  };

  useEffect(() => {
    cargarInfoRutina();
    buscarEjercicios('');
    cargarEjerciciosRutina();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const manejarCambioInfo = (e) => {
    setDatosInfoEdit({
      ...datosInfoEdit,
      [e.target.name]: e.target.value
    });
  };

  const guardarInfoRutina = async () => {
    try {
      const respuesta = await api.put(
        `api/rutinas/actualizar-rutina/${id}`,
        datosInfoEdit
      );
      if (respuesta.data.exito) {
        setRutinaInfo(respuesta.data.rutina);
        setEditandoInfo(false);
      }
    } catch {
      alert('Error al actualizar la información de la rutina.');
    }
  };

  const eliminarRutinaCompleta = async () => {
    const confirmar = window.confirm(
      '¿Estás absolutamente seguro de que quieres eliminar esta rutina entera? Se perderán todos sus ejercicios.'
    );
    if (confirmar) {
      try {
        const respuesta = await api.delete(`api/rutinas/eliminar-rutina/${id}`);
        if (respuesta.data.exito) {
          navigate('/rutinas');
        }
      } catch {
        alert('Error al eliminar la rutina.');
      }
    }
  };

  const manejarBusqueda = (e) => {
    e.preventDefault();
    buscarEjercicios(busqueda);
  };

  const agregarEjercicioARutina = async (ejercicio_id) => {
    try {
      const respuesta = await api.post(`api/rutina/${id}/añadir-ejercicio`, {
        ejercicio_id: ejercicio_id,
        series: 3,
        repeticiones: 8,
        peso: 0
      });
      if (respuesta.data.exito) {
        setEjerciciosRutina([
          ...ejerciciosRutina,
          respuesta.data.rutina_ejercicio
        ]);
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert('Este ejercicio ya está en tu rutina.');
      } else {
        alert('Hubo un error al añadir el ejercicio.');
      }
    }
  };

  const eliminarEjercicioDeRutina = async (ejercicio_id) => {
    try {
      const respuesta = await api.delete(
        `api/rutina/${id}/eliminar-ejercicio/${ejercicio_id}`
      );
      if (respuesta.data.exito) {
        setEjerciciosRutina(
          ejerciciosRutina.filter((e) => e.ejercicio_id !== ejercicio_id)
        );
      }
    } catch {
      alert('Error al eliminar el ejercicio.');
    }
  };

  const iniciarEdicion = (ejercicioRutina) => {
    setEditandoId(ejercicioRutina.ejercicio_id);
    setDatosEdicion({
      series: ejercicioRutina.series,
      repeticiones: ejercicioRutina.repeticiones,
      peso: ejercicioRutina.peso || 0
    });
  };

  const cancelarEdicion = () => {
    setEditandoId(null);
    setDatosEdicion({ series: '', repeticiones: '', peso: '' });
  };

  const manejarCambioEdicion = (e) => {
    setDatosEdicion({
      ...datosEdicion,
      [e.target.name]: Number(e.target.value)
    });
  };

  const guardarEdicion = async (ejercicio_id) => {
    try {
      const respuesta = await api.put(
        `api/rutina/${id}/editar-ejercicio/${ejercicio_id}`,
        datosEdicion
      );
      if (respuesta.data.exito) {
        setEjerciciosRutina(
          ejerciciosRutina.map((e) =>
            e.ejercicio_id === ejercicio_id
              ? respuesta.data.rutina_ejercicio
              : e
          )
        );
        setEditandoId(null);
      }
    } catch {
      alert('Error al actualizar el ejercicio.');
    }
  };

  const musculosTrabajados = Array.from(
    new Set(ejerciciosRutina.map((e) => e.ejercicio_detalle.grupo_muscular))
  );

  return (
    <div className="min-h-screen bg-background text-foreground p-4 sm:p-8 md:p-12">
      <div className="max-w-[1400px] mx-auto bg-container border border-primary-muted rounded-lg p-5 sm:p-8 md:p-10 shadow-2xl">
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
                    {rutinaInfo.nombre || `Rutina #${id}`}
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
                <p className="text-center text-muted-foreground mt-10">
                  Cargando...
                </p>
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
                      src={`http://127.0.0.1:5000${ejercicio.image_url}`}
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
                              <strong className="text-primary">
                                {item.series}
                              </strong>{' '}
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
        </div>
      </div>
    </div>
  );
}

export default DetalleRutina;
