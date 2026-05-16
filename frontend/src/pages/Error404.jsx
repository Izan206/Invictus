import { Link } from 'react-router-dom';
import { Dumbbell, Home } from 'lucide-react';

function Error404() {
  return (
    <div className="min-h-[70vh] bg-background flex flex-col justify-center items-center p-4 text-center w-full">
      <div className="relative">
        <h1 className="text-[150px] sm:text-[200px] font-extrabold text-white opacity-5 tracking-tighter leading-none">
          404
        </h1>
        <div className="absolute inset-0 flex items-center justify-center">
          <Dumbbell
            className="w-24 h-24 sm:w-32 sm:h-32 text-primary animate-pulse"
            strokeWidth={1.5}
          />
        </div>
      </div>

      <h2 className="text-2xl sm:text-3xl font-bold text-white mt-8 mb-4 uppercase tracking-wide">
        ¡Vaya! No se ha encontrado la página
      </h2>

      <p className="text-muted-foreground max-w-md mx-auto mb-10 text-sm sm:text-base">
        La página que intentas visitar no existe.
      </p>

      <Link
        to="/"
        className="flex items-center gap-2 bg-primary text-black px-6 py-3 rounded-md font-bold hover:bg-transparent transition-all border border-transparent hover:border-primary hover:text-white duration-300 active:scale-95"
      >
        <Home className="w-5 h-5" />
        <span>Vuelve a Inicio</span>
      </Link>
    </div>
  );
}

export default Error404;
