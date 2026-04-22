import { Link } from 'react-router-dom';
import logoInvictus from '../../assets/logo/logo-footer.png';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

function Footer() {
  const añoActual = new Date().getFullYear();
  const { usuario } = useAuth();

  return (
    <footer className="relative bg-background pt-16 pb-8 mt-auto overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-30"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-16">
          <div className="md:col-span-4 flex flex-col items-center md:items-start text-center md:text-left">
            <Link to="/" className="mb-6 inline-block">
              <img
                src={logoInvictus}
                alt="Invictus"
                className="max-w-[100px] w-full hover:scale-105 transition-transform duration-500"
              />
            </Link>

            <p className="text-foreground/70 text-sm leading-relaxed mb-8 max-w-xs">
              La disciplina en su forma mas pura.
            </p>

            <div className="flex items-center gap-4">
              <a
                href="https://github.com/Izan206"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-foreground/80 hover:bg-primary hover:text-black hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(var(--color-primary),0.5)] transition-all duration-300"
              >
                <FaGithub className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/izan-alvarez/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-foreground/80 hover:bg-primary hover:text-black hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(var(--color-primary),0.5)] transition-all duration-300"
              >
                <FaLinkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="md:col-span-4 flex flex-col items-center md:items-start">
            <h3 className="text-foreground font-black uppercase tracking-widest text-sm mb-6">
              Explora
            </h3>
            <div className="flex flex-col gap-4 text-center md:text-left">
              <Link
                to="/"
                className="text-foreground/70 hover:text-primary transition-colors text-sm flex items-center justify-center md:justify-start opacity-70"
              >
                Inicio
              </Link>
              <Link
                to="/catalogo"
                className="text-foreground/70 hover:text-primary transition-colors text-sm flex items-center justify-center md:justify-start opacity-70"
              >
                Descubre Ejercicios
              </Link>
              {usuario && (
                <Link
                  to="/rutinas"
                  className="text-foreground/70 hover:text-primary transition-colors text-sm flex items-center justify-center md:justify-start opacity-70"
                >
                  Tus Rutinas
                </Link>
              )}
            </div>
          </div>

          <div className="md:col-span-4 flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-foreground font-black uppercase tracking-widest text-sm mb-6">
              Soporte
            </h3>
            <div className="flex flex-col gap-4 items-center md:items-start">
              <Link
                to="#"
                className="text-foreground/70 hover:text-primary transition-colors text-sm flex items-center justify-center md:justify-start opacity-70"
              >
                Contacto
              </Link>
              <Link
                to="#"
                className="text-foreground/70 hover:text-primary transition-colors text-sm flex items-center justify-center md:justify-start opacity-70"
              >
                Aviso Legal
              </Link>
              <Link
                to="#"
                className="text-foreground/70 hover:text-primary transition-colors text-sm flex items-center justify-center md:justify-start opacity-70"
              >
                Privacidad
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-foreground/40 text-xs font-medium text-center md:text-left">
            &copy; {añoActual} Invictus. Desarrollado por{' '}
            <a
              href="https://github.com/Izan206"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors duration-300"
            >
              IzanCoder
            </a>
            .
          </p>
          <div className="flex items-center gap-2 text-xs font-medium text-foreground/40">
            <span>React</span>
            <span className="w-1 h-1"></span>
            <span>Tailwind CSS</span>
            <span className="w-1 h-1"></span>
            <span>Flask</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
