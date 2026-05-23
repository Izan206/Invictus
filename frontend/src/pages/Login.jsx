import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/auth_service';
import AuthCard from '../components/ui/AuthCard';
import { useAuth } from '../context/AuthContext';

function Login() {
  const { login } = useAuth();

  const pagina = useNavigate();

  const [credenciales, setCredenciales] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  const controlarEnvio = async (e) => {
    e.preventDefault();
    setError('');

    if (!credenciales.email || !credenciales.password) {
      setError('Por favor rellena todos los campos');
      return;
    }

    setCargando(true);
    try {
      const respuesta = await authService.login(credenciales);
      console.log(respuesta);
      login({
        token: respuesta.token,
        email: respuesta.usuario,
        username: respuesta.username,
        foto_url: respuesta.foto_url
      });
      pagina('/catalogo');
    } catch (excepcion) {
      console.error('Error en login:', excepcion);
      setError(
        excepcion.response?.data?.error ||
          'Credenciales incorrectas. Inténtalo de nuevo.'
      );
    } finally {
      setCargando(false);
    }
  };

  return (
    <AuthCard
      title="Iniciar Sesión"
      description="Bienvenido de nuevo."
      error={error}
    >
      <form onSubmit={controlarEnvio} className="w-full flex flex-col">
        <div className="space-y-4 mb-6">
          <input
            type="email"
            placeholder="abc@gmail.com"
            value={credenciales.email}
            onChange={(e) =>
              setCredenciales({ ...credenciales, email: e.target.value })
            }
            className="w-full h-14 bg-neutral-900 border border-neutral-800 rounded-xl px-5 py-4 text-white placeholder:text-neutral-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={credenciales.password}
            onChange={(e) =>
              setCredenciales({ ...credenciales, password: e.target.value })
            }
            className="w-full h-14 bg-neutral-900 border border-neutral-800 rounded-xl px-5 py-4 text-white placeholder:text-neutral-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>

        <button
          type="submit"
          disabled={cargando}
          className="w-full h-14 bg-primary text-black font-bold text-lg rounded-xl hover:bg-transparent border border-transparent hover:border-primary hover:text-primary transition-colors duration-300 disabled:bg-neutral-800 disabled:text-neutral-600 disabled:cursor-not-allowed mb-6"
        >
          {cargando ? 'Entrando...' : 'Iniciar Sesión'}
        </button>

        <span className="text-center text-neutral-500">
          ¿Aún no tienes cuenta?{' '}
          <Link
            to="/registro"
            className="text-primary font-medium hover:text-[#00ffff] hover:opacity-45 duration-300 transition-all"
          >
            Regístrate aquí
          </Link>
        </span>
      </form>
    </AuthCard>
  );
}

export default Login;
