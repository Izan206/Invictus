import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LogOut,
  Save,
  User,
  Scale,
  Ruler,
  Calendar as CalendarIcon,
  Loader2,
  Dumbbell,
  Search,
  ArrowRight,
  Pencil,
  Trash2
} from 'lucide-react';
//eslint-disable-next-line
import { motion } from 'framer-motion';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

function Perfil() {
  const navigate = useNavigate();
  const { logout, actualizarDatosUsuario } = useAuth();
  const inputArchivoRef = useRef(null);

  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [subiendoImagen, setSubiendoImagen] = useState(false);
  const [error, setError] = useState(null);

  const [datosUsuario, setDatosUsuario] = useState({
    username: '',
    email: '',
    edad: '',
    peso: '',
    altura: ''
  });

  const [fotoURL, setFotoUrl] = useState('');

  const CLOUD_NAME = 'duhbejhfw';
  const UPLOAD_PRESET = 'Invictus';

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
          setFotoUrl(perfil.foto_url || '');
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

  const manejarSubidaImagen = async (e) => {
    const archivo = e.target.files[0];
    if (!archivo) return;

    setSubiendoImagen(true);

    const formData = new FormData();
    formData.append('file', archivo);
    formData.append('upload_preset', UPLOAD_PRESET);

    try {
      const respuestaCloudinary = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData
        }
      );

      const resultado = await respuestaCloudinary.json();

      if (resultado.secure_url) {
        const urlFinal = resultado.secure_url;

        await api.put('/api/usuarios/perfil', {
          ...datosUsuario,
          foto_url: urlFinal
        });

        setFotoUrl(urlFinal);
        actualizarDatosUsuario({ foto_url: urlFinal });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubiendoImagen(false);
    }
  };

  const eliminarFoto = async () => {
    setSubiendoImagen(true);
    try {
      await api.put('/api/usuarios/perfil', {
        ...datosUsuario,
        foto_url: ''
      });
      setFotoUrl('');
      actualizarDatosUsuario({ foto_url: '' });
    } catch (err) {
      console.error(err);
    } finally {
      setSubiendoImagen(false);
    }
  };

  const guardarPerfil = async (e) => {
    e.preventDefault();
    setGuardando(true);
    try {
      await api.put('/api/usuarios/perfil', {
        peso: datosUsuario.peso,
        altura: datosUsuario.altura,
        edad: datosUsuario.edad
      });
    } catch {
      console.error('Error al guardar el perfil');
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
    <div className="min-h-screen bg-black pt-20 pb-20 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
        >
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-28 h-28 bg-primary/10 rounded-full flex items-center justify-center border border-primary overflow-hidden relative group">
                {subiendoImagen ? (
                  <Loader2 className="w-6 h-6 text-primary animate-spin" />
                ) : (
                  <>
                    {fotoURL ? (
                      <img
                        src={fotoURL}
                        alt="Avatar"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-8 h-8 text-primary" />
                    )}

                    <div
                      className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center cursor-pointer"
                      onClick={() => inputArchivoRef.current?.click()}
                    >
                      <Pencil className="w-5 h-5 text-white" />
                    </div>
                  </>
                )}
              </div>

              {!subiendoImagen && fotoURL && (
                <button
                  type="button"
                  onClick={eliminarFoto}
                  className="absolute bottom-0 right-0 z-10 w-8 h-8 bg-black text-red-500 rounded-full flex items-center justify-center border border-red-500 hover:bg-red-500 hover:text-white transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}

              <input
                type="file"
                ref={inputArchivoRef}
                onChange={manejarSubidaImagen}
                accept="image/*"
                className="hidden"
              />
            </div>

            <div className="min-w-0">
              <h1 className="text-2xl font-semibold text-white">
                {datosUsuario.username}
              </h1>
              <p className="text-sm text-neutral-400">{datosUsuario.email}</p>
            </div>
          </div>
          <button
            onClick={cerrarSesion}
            className="flex items-center justify-center gap-2 px-5 py-2 border border-red-500/50 text-red-500 hover:bg-red-500/10 rounded-lg text-sm font-medium transition-colors duration-200"
          >
            <LogOut className="w-4 h-4" />
            <span>Cerrar Sesión</span>
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-container border border-neutral-800/50 rounded-xl p-6 sm:p-8"
        >
          <h2 className="text-lg font-semibold text-white mb-6">
            Información Personal
          </h2>

          <form onSubmit={guardarPerfil} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-medium text-neutral-400 uppercase tracking-wider flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4" />
                  Edad
                </label>
                <input
                  type="number"
                  name="edad"
                  value={datosUsuario.edad}
                  onChange={manejarCambio}
                  className="w-full bg-[#111111] border border-neutral-800 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-neutral-400 uppercase tracking-wider flex items-center gap-2">
                  <Scale className="w-4 h-4" />
                  Peso (kg)
                </label>
                <input
                  type="number"
                  name="peso"
                  step="0.1"
                  value={datosUsuario.peso}
                  onChange={manejarCambio}
                  className="w-full bg-[#111111] border border-neutral-800 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-neutral-400 uppercase tracking-wider flex items-center gap-2">
                  <Ruler className="w-4 h-4" />
                  Altura (cm)
                </label>
                <input
                  type="number"
                  name="altura"
                  value={datosUsuario.altura}
                  onChange={manejarCambio}
                  className="w-full bg-[#111111] border border-neutral-800 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-colors"
                />
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={guardando}
                className="flex items-center gap-2 bg-primary text-black px-6 py-2 rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {guardando ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                Guardar
              </button>
            </div>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-container border border-neutral-800/50 rounded-xl p-6 sm:p-8"
        >
          <h2 className="text-lg font-semibold text-white mb-6">
            Tus Estadísticas
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-[#111111] rounded-lg p-4 border border-neutral-800/50">
              <p className="text-xs text-neutral-500 uppercase tracking-wider mb-2">
                Edad
              </p>
              <p className="text-2xl font-semibold text-white">
                {datosUsuario.edad || '—'}
              </p>
            </div>

            <div className="bg-[#111111] rounded-lg p-4 border border-neutral-800/50">
              <p className="text-xs text-neutral-500 uppercase tracking-wider mb-2">
                Peso
              </p>
              <p className="text-2xl font-semibold text-white">
                {datosUsuario.peso || '—'}{' '}
                <span className="text-sm font-normal text-neutral-500">kg</span>
              </p>
            </div>

            <div className="bg-[#111111] rounded-lg p-4 border border-neutral-800/50">
              <p className="text-xs text-neutral-500 uppercase tracking-wider mb-2">
                Altura
              </p>
              <p className="text-2xl font-semibold text-white">
                {datosUsuario.altura || '—'}{' '}
                <span className="text-sm font-normal text-neutral-500">cm</span>
              </p>
            </div>

            <div
              className={`rounded-lg p-4 border border-neutral-800/50 ${
                infoIMC.valor
                  ? `bg-${infoIMC.color.split('-')[1]}-500/5`
                  : 'bg-[#111111]'
              }`}
            >
              <p className="text-xs text-neutral-500 uppercase tracking-wider mb-2">
                IMC
              </p>
              <p className={`text-2xl font-semibold ${infoIMC.color}`}>
                {infoIMC.valor || '—'}
              </p>
            </div>
          </div>

          {infoIMC.valor > 0 && (
            <div className="mt-6 flex items-center justify-between p-4 bg-[#111111] rounded-lg border border-neutral-800/50">
              <span className="text-sm text-neutral-400">Estado:</span>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium border ${infoIMC.color} border-current bg-current/10`}
              >
                {infoIMC.estado}
              </span>
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          <button
            onClick={() => navigate('/catalogo')}
            className="flex items-center gap-4 bg-container border border-neutral-800/50 rounded-xl p-5 hover:border-primary hover:bg-primary/5 transition-all duration-200 text-left group"
          >
            <div className="w-12 h-12 bg-[#111111] rounded-lg flex items-center justify-center border border-neutral-800/50 group-hover:border-primary/30 transition-colors">
              <Search className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-white">Catálogo</h3>
              <p className="text-xs text-neutral-500">Explorar ejercicios</p>
            </div>
            <ArrowRight className="w-5 h-5 text-neutral-600 group-hover:text-primary transition-colors flex-shrink-0" />
          </button>

          <button
            onClick={() => navigate('/rutinas')}
            className="flex items-center gap-4 bg-container border border-neutral-800/50 rounded-xl p-5 hover:border-primary hover:bg-primary/5 transition-all duration-200 text-left group"
          >
            <div className="w-12 h-12 bg-[#111111] rounded-lg flex items-center justify-center border border-neutral-800/50 group-hover:border-primary/30 transition-colors">
              <Dumbbell className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-white">Mis Rutinas</h3>
              <p className="text-xs text-neutral-500">Ver mis entrenamientos</p>
            </div>
            <ArrowRight className="w-5 h-5 text-neutral-600 group-hover:text-primary transition-colors flex-shrink-0" />
          </button>
        </motion.div>
      </div>
    </div>
  );
}

export default Perfil;
