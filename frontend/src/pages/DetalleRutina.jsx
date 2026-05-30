import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import RutinaHeader from '../components/rutinas/RutinaHeader';
import CatalogoPanel from '../components/rutinas/CatalogoPanel';
import EjerciciosRutinaPanel from '../components/rutinas/EjerciciosRutinaPanel';
import { arrayMove } from '@dnd-kit/sortable';

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
      '¿Estás seguro de que quieres eliminar esta rutina? Perderas todos sus ejercicios'
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

  const manejarDragEnd = async (evento) => {
    const { active, over } = evento;

    if (active && over && active.id !== over.id) {
      let nuevoOrden = [];

      setEjerciciosRutina((ejerciciosActuales) => {
        const oldIndex = ejerciciosActuales.findIndex(
          (e) => e.ejercicio_id === active.id
        );
        const newIndex = ejerciciosActuales.findIndex(
          (e) => e.ejercicio_id === over.id
        );

        const nuevaLista = arrayMove(ejerciciosActuales, oldIndex, newIndex);

        nuevoOrden = nuevaLista.map((e) => e.ejercicio_id);
        return nuevaLista;
      });

      try {
        await api.put(`api/rutina/${id}/reordenar`, {
          orden_ids: nuevoOrden
        });
      } catch (error) {
        console.error('Error al guardar el orden en la base de datos:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-4 sm:p-8 md:p-12">
      <div className="max-w-[1400px] mx-auto bg-container border border-primary-muted rounded-lg p-5 sm:p-8 md:p-10 shadow-2xl">
        <RutinaHeader
          rutinaInfo={rutinaInfo}
          editandoInfo={editandoInfo}
          setEditandoInfo={setEditandoInfo}
          datosInfoEdit={datosInfoEdit}
          manejarCambioInfo={manejarCambioInfo}
          guardarInfoRutina={guardarInfoRutina}
          eliminarRutinaCompleta={eliminarRutinaCompleta}
          musculosTrabajados={musculosTrabajados}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <CatalogoPanel
            busqueda={busqueda}
            setBusqueda={setBusqueda}
            manejarBusqueda={manejarBusqueda}
            cargandoCatalogo={cargandoCatalogo}
            ejerciciosCatalogo={ejerciciosCatalogo}
            agregarEjercicioARutina={agregarEjercicioARutina}
          />
          <EjerciciosRutinaPanel
            cargandoRutina={cargandoRutina}
            ejerciciosRutina={ejerciciosRutina}
            editandoId={editandoId}
            datosEdicion={datosEdicion}
            manejarCambioEdicion={manejarCambioEdicion}
            guardarEdicion={guardarEdicion}
            cancelarEdicion={cancelarEdicion}
            iniciarEdicion={iniciarEdicion}
            eliminarEjercicioDeRutina={eliminarEjercicioDeRutina}
            manejarDragEnd={manejarDragEnd}
          />
        </div>
      </div>
    </div>
  );
}

export default DetalleRutina;
