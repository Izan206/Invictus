import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import Inicio from './pages/Inicio';
import Registro from './pages/Registro';
import Login from './pages/Login';
import Catalogo from './pages/Catalogo';
import TusRutinas from './pages/TusRutinas';
import Error404 from './pages/Error404';

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Inicio />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/rutinas" element={<TusRutinas />} />
        <Route path="*" element={<Error404 />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
      </Route>
    </Routes>
  );
}

export default App;
