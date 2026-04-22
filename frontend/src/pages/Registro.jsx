import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/auth_service';
import AuthCard from '../components/ui/AuthCard';

function Registro() {
  const pagina = useNavigate();
  const [infoUsuario, setInfoUsuario] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  const controlarEnvio = async (e) => {
    e.preventDefault();
    setError('');

    if (!infoUsuario.username || !infoUsuario.email || !infoUsuario.password) {
      setError('Por favor, rellena todos los campos.');
      return;
    }

    if (infoUsuario.password.length < 3) {
      setError('La contraseña es demasiado corta.');
      return;
    }

    setCargando(true);
    try {
      const respuesta = await authService.registro(infoUsuario);
      pagina('/login');
      console.log(respuesta);
    } catch (excepcion) {
      console.log(
        'Ha ocurrido un error a la hora de enviar los datos al back: ',
        excepcion
      );
      setError(
        excepcion.response?.data?.error ||
          'Error al conectar con el servidor. Inténtalo de nuevo.'
      );
    } finally {
      setCargando(false);
    }
  };
  return (
    <AuthCard
      title="¡Bienvenido a Invictus!"
      description="Por favor, introduzca sus datos."
      error={error}
    >
      <form onSubmit={controlarEnvio} className="w-full flex flex-col">
        <div className="space-y-4 mb-6">
          <input
            type="text"
            placeholder="Nombre de Usuario..."
            value={infoUsuario.username}
            onChange={(e) =>
              setInfoUsuario({ ...infoUsuario, username: e.target.value })
            }
            className="w-full h-14 bg-neutral-900/70 border  rounded-xl px-5 py-4 text-white placeholder:text-neutral-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          />
          <input
            type="email"
            placeholder="abc@gmail.com"
            value={infoUsuario.email}
            onChange={(e) =>
              setInfoUsuario({ ...infoUsuario, email: e.target.value })
            }
            className="w-full h-14 bg-neutral-900/70 border  rounded-xl px-5 py-4 text-white placeholder:text-neutral-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={infoUsuario.password}
            onChange={(e) =>
              setInfoUsuario({ ...infoUsuario, password: e.target.value })
            }
            className="w-full h-14 bg-neutral-900/70 border  rounded-xl px-5 py-4 text-white placeholder:text-neutral-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>

        <button
          type="submit"
          disabled={cargando}
          className="w-full h-14 bg-primary text-black font-bold text-lg rounded-xl hover:bg-transparent border border-transparent hover:border-primary hover:text-primary transition-colors duration-300 disabled:bg-neutral-800 disabled:text-neutral-600 disabled:cursor-not-allowed mb-6"
        >
          {cargando ? 'Registrando...' : 'Registrarse'}
        </button>

        <span className="text-center text-neutral-500">
          ¿Ya tienes cuenta?{' '}
          <Link
            to="/login"
            className="text-primary font-medium hover:text-[#00ffff] hover:opacity-45 duration-300 transition-all "
          >
            Únete aquí
          </Link>
        </span>
      </form>
    </AuthCard>
  );
}

export default Registro;
