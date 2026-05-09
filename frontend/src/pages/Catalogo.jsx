import { useState, useEffect } from 'react';
import { Search, Loader2 } from 'lucide-react';
// eslint-disable-next-line
import { motion, AnimatePresence } from 'framer-motion';
import api from '../services/api';

const BACKEND_URL = 'http://127.0.0.1:5000';

const categorias = [
  'Todo',
  'Pecho',
  'Espalda',
  'Bíceps',
  'Tríceps',
  'Abdominales',
  'Pierna',
  'Hombros'
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 300, damping: 24 }
  }
};

function Catalogo() {
  const [busqueda, setBusqueda] = useState('');
  const [categoriaActiva, setCategoriaActiva] = useState('Todo');

  const [ejerciciosBd, setEjerciciosBd] = useState([]);
  const [meta, setMeta] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const [ejercicioDestacado, setEjercicioDestacado] = useState(null);
  const [paginaActual, setPaginaActual] = useState(1);

  //esto va hacer que el ejercicio destacado sea aleatorio y solo se actualice cada 24h
  useEffect(() => {
    const cargarDestacadoDiario = async () => {
      try {
        const hoy = new Date();
        const inicioAño = new Date(hoy.getFullYear(), 0, 0);
        const diaDelAño = Math.floor((hoy - inicioAño) / (1000 * 60 * 60 * 24));

        const indiceDiario = (diaDelAño % 70) + 1;

        const response = await api.get('/api/ejercicios/catalogo', {
          params: { page: indiceDiario, limit: 1 }
        });

        if (response.data.exito && response.data.resultados.length > 0) {
          const ejercicio = response.data.resultados[0];
          setEjercicioDestacado({
            ...ejercicio,
            descripcion_corta: `Ejercicio destacado para tu entrenamiento de hoy. Enfocado en trabajar ${ejercicio.grupo_muscular.toLowerCase()}.`
          });
        }
      } catch (err) {
        console.error(err);
      }
    };

    cargarDestacadoDiario();
  }, []);

  useEffect(() => {
    const temporizador = setTimeout(async () => {
      setCargando(true);
      setError(null);

      try {
        const params = {
          page: paginaActual,
          limit: 12
        };

        if (categoriaActiva !== 'Todo') params.categoria = categoriaActiva;
        if (busqueda.trim() !== '') params.busqueda = busqueda;

        const response = await api.get('/api/ejercicios/catalogo', { params });

        if (response.data.exito) {
          setEjerciciosBd(response.data.resultados);
          setMeta(response.data.meta);
        } else {
          setEjerciciosBd([]);
          setMeta(null);
        }
      } catch (err) {
        console.error(err);
        setError('Error de conexión con el servidor.');
        setEjerciciosBd([]);
      } finally {
        setCargando(false);
      }
    }, 300);

    return () => clearTimeout(temporizador);
  }, [paginaActual, categoriaActiva, busqueda]);

  const manejarCambioFiltro = (nuevaCategoria) => {
    setCategoriaActiva(nuevaCategoria);
    setPaginaActual(1);
  };

  const manejarBusqueda = (e) => {
    setBusqueda(e.target.value);
    setPaginaActual(1);
  };

  return (
    <div className="min-h-screen bg-black pt-28 pb-20 px-4 sm:px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-white tracking-widest uppercase">
            Catálogo de Ejercicios
          </h1>
          <div className="w-48 h-1 bg-primary mt-4"></div>
        </motion.div>

        {ejercicioDestacado && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-container border border-neutral-800 rounded-2xl overflow-hidden flex flex-col md:flex-row"
          >
            <div className="p-8 md:p-12 flex flex-col justify-center w-full md:w-1/2">
              <span className="text-primary font-bold text-xs tracking-widest uppercase mb-4">
                Ejercicio del Día
              </span>
              <h2 className="text-4xl font-bold text-white uppercase mb-4">
                {ejercicioDestacado.nombre}
              </h2>
              <p className="text-neutral-400 mb-8 max-w-md line-clamp-3">
                {ejercicioDestacado.descripcion_corta}
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-1 bg-primary text-black text-xs font-bold rounded-full uppercase">
                  {ejercicioDestacado.grupo_muscular}
                </span>
                <span className="px-4 py-1 border border-primary text-primary text-xs font-bold rounded-full uppercase">
                  {ejercicioDestacado.dificultad}
                </span>
              </div>
            </div>
            <div className="w-full md:w-1/2 h-64 md:h-auto bg-white relative flex items-center justify-center p-4">
              <img
                src={`${BACKEND_URL}${ejercicioDestacado.image_url}`}
                alt={ejercicioDestacado.nombre}
                className="w-full h-full object-contain max-h-56 mix-blend-multiply transition-all duration-500"
              />
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex justify-center"
        >
          <div className="relative w-full max-w-2xl">
            <input
              type="text"
              placeholder="Busca tu ejercicio favorito..."
              value={busqueda}
              onChange={manejarBusqueda}
              className="w-full h-14 bg-[#111111] border border-neutral-800 rounded-full pl-14 pr-6 text-white placeholder:text-neutral-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
            />
            <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-neutral-500 w-5 h-5" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3"
        >
          {categorias.map((categoria) => (
            <button
              key={categoria}
              onClick={() => manejarCambioFiltro(categoria)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${categoriaActiva === categoria ? 'border-primary text-primary bg-primary/10' : 'border-neutral-800 text-neutral-400 hover:border-primary hover:text-white'}`}
            >
              {categoria}
            </button>
          ))}
        </motion.div>

        <div className="relative min-h-[400px]">
          {cargando && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/60 backdrop-blur-[2px] rounded-2xl">
              <Loader2 className="w-12 h-12 text-primary animate-spin" />
            </div>
          )}

          {error ? (
            <div className="text-center py-20 text-red-500 font-medium bg-red-500/10 rounded-xl border border-red-500/20">
              {error}
            </div>
          ) : (
            <AnimatePresence mode="wait">
              {ejerciciosBd.length > 0 ? (
                <motion.div
                  key={`grid-${paginaActual}-${categoriaActiva}-${busqueda}`}
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 transition-opacity duration-300 ${cargando ? 'opacity-30 pointer-events-none' : 'opacity-100'}`}
                >
                  {ejerciciosBd.map((ejercicio) => (
                    <motion.div
                      key={ejercicio.id_api}
                      variants={itemVariants}
                      whileHover={{ scale: 1.02 }}
                      className="bg-[#111111] border border-neutral-800 rounded-xl overflow-hidden hover:border-primary transition-colors duration-300 group cursor-pointer flex flex-col"
                    >
                      <div className="h-44 bg-white flex items-center justify-center p-4 overflow-hidden relative">
                        <img
                          src={`${BACKEND_URL}${ejercicio.image_url}`}
                          alt={ejercicio.nombre}
                          className="w-full h-full object-contain mix-blend-multiply transition-all duration-500 group-hover:scale-110"
                        />
                      </div>
                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <h3 className="text-white font-bold uppercase text-[13px] mb-4 line-clamp-2">
                          {ejercicio.nombre}
                        </h3>
                        <div className="flex flex-wrap gap-2 mt-auto">
                          <span className="px-3 py-2 bg-primary text-black text-[9px] font-bold rounded-full uppercase flex items-center text-center leading-none">
                            {ejercicio.grupo_muscular}
                          </span>
                          <span className="px-3 py-2 border border-neutral-600 text-neutral-400 text-[9px] font-bold rounded-full uppercase flex items-center text-center leading-none">
                            {ejercicio.maquina}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                !cargando && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-20 bg-[#111111] rounded-2xl border border-neutral-800"
                  >
                    <p className="text-neutral-500 text-xl font-medium mb-4">
                      No se encontraron ejercicios con esos filtros.
                    </p>
                  </motion.div>
                )
              )}
            </AnimatePresence>
          )}
        </div>

        {meta && meta.paginas_totales > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex justify-center items-center gap-6 pt-8 border-t border-neutral-800 mt-10"
          >
            <button
              onClick={() => setPaginaActual((prev) => prev - 1)}
              disabled={!meta.tiene_anterior || cargando}
              className={`px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 ${!meta.tiene_anterior || cargando ? 'bg-neutral-900 text-neutral-700 cursor-not-allowed' : 'bg-[#111111] text-white hover:bg-primary hover:text-black border border-neutral-800 hover:border-primary'}`}
            >
              Anterior
            </button>
            <span
              className={`text-primary font-bold text-sm px-6 py-2 rounded-full border transition-colors ${cargando ? 'bg-transparent border-neutral-800 text-neutral-500' : 'bg-primary/10 border-primary/20'}`}
            >
              PÁGINA {meta.pagina_actual} / {meta.paginas_totales}
            </span>
            <button
              onClick={() => setPaginaActual((prev) => prev + 1)}
              disabled={!meta.tiene_siguiente || cargando}
              className={`px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 ${!meta.tiene_siguiente || cargando ? 'bg-neutral-900 text-neutral-700 cursor-not-allowed' : 'bg-[#111111] text-white hover:bg-primary hover:text-black border border-neutral-800 hover:border-primary'}`}
            >
              Siguiente
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default Catalogo;
