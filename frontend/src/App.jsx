import { Routes, Route, Link } from 'react-router-dom';
import './index.css';

import Login from './pages/Login';
import Catalogo from './pages/Catalogo';
import Error404 from './pages/Error404';

function App() {
  return (
    <div>
      <nav>
        <Link to="/">Ir al Login</Link>
        <Link to="/catalogo">Ir al catalogo</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </div>
  );
}

export default App;
