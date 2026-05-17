import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LogOut,
  Save,
  User,
  Activity,
  Scale,
  Ruler,
  Calendar as CalendarIcon,
  Loader2,
  Dumbbell,
  Search,
  ArrowRight
} from 'lucide-react';
// eslint-disable-next-line
import { motion } from 'framer-motion';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

function Perfil() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState(null);

  const [datosUsuario, setDatosUsuario] = useState({
    username: '',
    email: '',
    edad: '',
    peso: '',
    altura: ''
  });

  useEffect(() => {
    const cargarPerfil = async () => {
      try {
        const respuesta = await api.get('/api/usuarios/perfil');
        if (respuesta.data.exito) {
          const perfil = respuesta.data.perfil;
          setDatosUsuario({
            username: perfil.username || '',
            email: perfil.email || '',
            edad: perfil.edad || '',
            peso: perfil.peso || '',
            altura: perfil.altura || ''
          });
        }
      } catch (err) {
        if (err.response && err.response.status === 401) {
          logout();
          navigate('/');
        } else {
          setError('No se pudo cargar la información del perfil.');
        }
      } finally {
        setCargando(false);
      }
    };

    cargarPerfil();
  }, [navigate, logout]);

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setDatosUsuario({
      ...datosUsuario,
      [name]: value === '' ? '' : Number(value)
    });
  };

  const calcularIMC = () => {
    if (!datosUsuario.peso || !datosUsuario.altura) {
      return { valor: 0, estado: 'Faltan datos', color: 'text-neutral-500' };
    }
    const alturaMetros = datosUsuario.altura / 100;
    const imc = (datosUsuario.peso / (alturaMetros * alturaMetros)).toFixed(1);

    if (imc < 18.5)
      return { valor: imc, estado: 'Bajo peso', color: 'text-blue-400' };
    if (imc >= 18.5 && imc <= 24.9)
      return { valor: imc, estado: 'Peso normal', color: 'text-green-400' };
    if (imc >= 25 && imc <= 29.9)
      return { valor: imc, estado: 'Sobrepeso', color: 'text-yellow-400' };
    return { valor: imc, estado: 'Obesidad', color: 'text-red-500' };
  };

  const infoIMC = calcularIMC();

  const guardarPerfil = async (e) => {
    e.preventDefault();
    setGuardando(true);
    try {
      await api.put('/api/usuarios/perfil', {
        peso: datosUsuario.peso,
        altura: datosUsuario.altura,
        edad: datosUsuario.edad
      });
      alert('Perfil actualizado con éxito!');
    } catch {
      alert('Error al guardar el perfil');
    } finally {
      setGuardando(false);
    }
  };

  const cerrarSesion = () => {
    logout();
    navigate('/');
  };

  if (cargando) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg p-6 font-medium">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-32 pb-20 px-4 sm:px-6 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-5xl bg-container border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden"
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 p-8 border-b border-neutral-800 bg-[#111111]/50">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center border-2 border-primary">
              <User className="w-10 h-10 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-white uppercase tracking-wider">
                {datosUsuario.username}
              </h1>
              <p className="text-neutral-400 font-medium">
                {datosUsuario.email}
              </p>
            </div>
          </div>
          <button
            onClick={cerrarSesion}
            className="flex items-center gap-2 px-6 py-3 border border-red-500/30 text-red-500 hover:bg-red-500 hover:text-white rounded-lg font-bold uppercase text-sm transition-all duration-300"
          >
            <LogOut className="w-4 h-4" /> Cerrar Sesión
          </button>
        </div>

        <div className="flex flex-col lg:flex-row">
          <div className="flex-1 p-8 border-b lg:border-b-0 lg:border-r border-neutral-800">
            <h2 className="text-xl font-bold text-white uppercase mb-6 flex items-center gap-2 pb-4">
              <Activity className="w-5 h-5 text-primary" /> Tus Estadísticas
            </h2>

            <form onSubmit={guardarPerfil} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-neutral-400 text-sm font-bold uppercase tracking-wider flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4" /> Edad
                  </label>
                  <input
                    type="number"
                    name="edad"
                    value={datosUsuario.edad}
                    onChange={manejarCambio}
                    className="w-full bg-[#111111] border border-neutral-800 rounded-lg p-4 text-white font-bold text-lg focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-neutral-400 text-sm font-bold uppercase tracking-wider flex items-center gap-2">
                    <Scale className="w-4 h-4" /> Peso (KG)
                  </label>
                  <input
                    type="number"
                    name="peso"
                    step="0.1"
                    value={datosUsuario.peso}
                    onChange={manejarCambio}
                    className="w-full bg-[#111111] border border-neutral-800 rounded-lg p-4 text-white font-bold text-lg focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-neutral-400 text-sm font-bold uppercase tracking-wider flex items-center gap-2">
                    <Ruler className="w-4 h-4" /> Altura (CM)
                  </label>
                  <input
                    type="number"
                    name="altura"
                    value={datosUsuario.altura}
                    onChange={manejarCambio}
                    className="w-full bg-[#111111] border border-neutral-800 rounded-lg p-4 text-white font-bold text-lg focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>

              <div className="pt-6 flex justify-end">
                <button
                  type="submit"
                  disabled={guardando}
                  className="flex items-center gap-2 bg-primary text-black px-8 py-3 rounded-lg font-bold uppercase tracking-wider transition-all hover:scale-[1.01] active:scale-95 disabled:opacity-50"
                >
                  {guardando ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Save className="w-5 h-5" />
                  )}{' '}
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>

          <div className="w-full lg:w-80 p-8 flex flex-col justify-center items-center text-center relative overflow-hidden bg-black/20">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-10 -mt-10"></div>

            <h3 className="text-neutral-400 text-sm font-bold uppercase tracking-wider mb-4">
              Índice de Masa Corporal
            </h3>

            <div className="text-6xl font-black text-white mb-6">
              {infoIMC.valor || '--'}
            </div>

            <div
              className={`px-6 py-2 rounded-full border border-current bg-current/10 font-bold uppercase text-sm ${infoIMC.color}`}
            >
              {infoIMC.estado}
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="w-full max-w-5xl mt-8 grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <button
          onClick={() => navigate('/catalogo')}
          className="group flex items-center justify-between bg-container border border-neutral-800 hover:border-primary rounded-2xl p-6 transition-all duration-300 text-left overflow-hidden relative"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl -mr-10 -mt-10 transition-opacity group-hover:opacity-100 opacity-0"></div>
          <div className="flex items-center gap-5 z-10">
            <div className="w-14 h-14 bg-[#111111] rounded-xl flex items-center justify-center border border-neutral-800 group-hover:border-primary/50 transition-colors">
              <Search className="w-7 h-7 text-white group-hover:text-primary transition-colors" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white uppercase tracking-wider">
                Catálogo
              </h3>
              <p className="text-sm text-neutral-400">
                Explora todos los ejercicios disponibles
              </p>
            </div>
          </div>
          <ArrowRight className="w-6 h-6 text-neutral-600 group-hover:text-primary group-hover:translate-x-1 transition-all z-10" />
        </button>

        <button
          onClick={() => navigate('/rutinas')}
          className="group flex items-center justify-between bg-container border border-neutral-800 hover:border-primary rounded-2xl p-6 transition-all duration-300 text-left overflow-hidden relative"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl -mr-10 -mt-10 transition-opacity group-hover:opacity-100 opacity-0"></div>
          <div className="flex items-center gap-5 z-10">
            <div className="w-14 h-14 bg-[#111111] rounded-xl flex items-center justify-center border border-neutral-800 group-hover:border-primary/50 transition-colors">
              <Dumbbell className="w-7 h-7 text-white group-hover:text-primary transition-colors" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white uppercase tracking-wider">
                Tus Rutinas
              </h3>
              <p className="text-sm text-neutral-400">
                Crea, edita y gestiona tus entrenamientos
              </p>
            </div>
          </div>
          <ArrowRight className="w-6 h-6 text-neutral-600 group-hover:text-primary group-hover:translate-x-1 transition-all z-10" />
        </button>
      </motion.div>
    </div>
  );
}

export default Perfil;
