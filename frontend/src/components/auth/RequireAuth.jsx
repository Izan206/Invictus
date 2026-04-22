import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function RequireAuth({ children }) {
  const { usuario, cargando } = useAuth();

  if (cargando) {
    return (
      <div className="w-full min-h-screen bg-black flex justify-center items-center text-primary font-bold">
        Cargando...
      </div>
    );
  }

  if (!usuario) {
    return <Navigate to="/registro" replace />;
  }

  return children;
}

export default RequireAuth;
