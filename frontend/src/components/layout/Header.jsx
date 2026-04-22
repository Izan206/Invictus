import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logoInvictus from '../../assets/logo/logo-final.png';
import { Menu, X, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

function Header() {
  const ubicacion = useLocation();
  const navigate = useNavigate();
  const [menuMovilAbierto, setMenuMovilAbierto] = useState(false);

  const { usuario, logout } = useAuth();

  const enlacesNav = [
    { name: 'Inicio', path: '/' },
    { name: 'Descubre Ejercicios', path: '/catalogo' },
    ...(usuario ? [{ name: 'Tus Rutinas', path: '/rutinas' }] : [])
  ];

  const cerrarMenuMovil = () => setMenuMovilAbierto(false);

  const manejarCierreSesion = () => {
    logout();
    cerrarMenuMovil();
    navigate('/');
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-background/95 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        <Link to="/" onClick={cerrarMenuMovil} className="z-50 md:-ml-11">
          <img
            src={logoInvictus}
            alt="Invictus"
            className="max-w-[150px] w-full"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {enlacesNav.map((enlace) => (
            <Link
              key={enlace.path}
              to={enlace.path}
              className={`text-sm font-medium transition-colors duration-200 hover:text-primary ${
                ubicacion.pathname === enlace.path
                  ? 'text-primary'
                  : 'text-foreground'
              }`}
            >
              {enlace.name}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          {usuario ? (
            <>
              {' '}
              <Link
                to="/perfil"
                className=" group flex items-center justify-center gap-2 border border-primary rounded-full py-4 px-10 text-foreground hover:bg-primary  hover:text-black transition-colors duration-500"
              >
                <User className="w-5 h-5 text-foreground group-hover:text-black transition-colors duration-500" />
                <span className="font-medium text-sm group-hover:font-medium">
                  {usuario.username}
                </span>
              </Link>
              {/* este boton va a ser temporal, más adelante lo metere solo dentro de la página de peril */}
              <button
                onClick={manejarCierreSesion}
                className="text-sm font-medium text-red-500 hover:text-red-400 transition-colors"
              >
                Salir
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="px-10 py-4 border border-white/20 rounded-full text-white font-bold text-xs tracking-[0.2em] uppercase hover:border-[#00ffff] hover:text-[#00ffff] hover:bg-[#00ffff]/5 transition-all duration-300"
            >
              Iniciar Sesión
            </Link>
          )}
        </div>

        <button
          className="md:hidden z-50 text-foreground p-2"
          onClick={() => setMenuMovilAbierto(!menuMovilAbierto)}
          aria-label="Alternar menú"
        >
          {menuMovilAbierto ? (
            <X className="w-8 h-8" />
          ) : (
            <Menu className="w-8 h-8" />
          )}
        </button>
      </div>

      {/* a partir de aquí es el menu mobile */}
      <div
        className={`md:hidden absolute top-0 left-0 w-full bg-background border-b border-white/5 transition-all duration-300 ease-in-out ${
          menuMovilAbierto
            ? 'opacity-100 visible h-screen pt-24'
            : 'opacity-0 invisible h-0 overflow-hidden'
        }`}
      >
        <div className="flex flex-col items-center gap-8 px-4 pb-8">
          {enlacesNav.map((enlace) => (
            <Link
              key={enlace.path}
              to={enlace.path}
              onClick={cerrarMenuMovil}
              className={`text-xl font-medium transition-colors ${
                ubicacion.pathname === enlace.path
                  ? 'text-primary'
                  : 'text-foreground'
              }`}
            >
              {enlace.name}
            </Link>
          ))}

          <div className="w-full h-px bg-white/30 my-2"></div>

          {usuario ? (
            <>
              {' '}
              <Link
                to="/perfil"
                onClick={cerrarMenuMovil}
                className="flex items-center gap-3 text-foreground hover:text-primary transition-colors"
              >
                <User className="w-6 h-6 text-primary" />
                <span className="text-xl font-medium">{usuario.username}</span>
              </Link>
              <button
                onClick={manejarCierreSesion}
                className="text-lg font-bold text-red-500 uppercase tracking-wider hover:text-red-400 transition-colors mt-2"
              >
                Cerrar Sesión
              </button>
            </>
          ) : (
            <Link
              to="/login"
              onClick={cerrarMenuMovil}
              className="w-full text-center py-4 border border-primary bg-background rounded-full hover:bg-primary hover:text-background transition-all duration-300 font-bold uppercase tracking-wider text-primary"
            >
              Iniciar Sesión
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
