import { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

const esTokenValido = (token) => {
  if (!token) return false;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const tiempoExpiracion = payload.exp * 1000;

    return Date.now() < tiempoExpiracion;
  } catch {
    return false;
  }
};

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(() => {
    const tokenGuardado = localStorage.getItem('token_invictus');
    const emailGuardado = localStorage.getItem('email_invictus');
    const usernameGuardado = localStorage.getItem('username_invictus');
    const fotoGuardada = localStorage.getItem('foto_invictus');

    if (tokenGuardado && emailGuardado) {
      if (esTokenValido(tokenGuardado)) {
        return {
          email: emailGuardado,
          token: tokenGuardado,
          username: usernameGuardado,
          foto_url: fotoGuardada || null
        };
      } else {
        localStorage.removeItem('token_invictus');
        localStorage.removeItem('email_invictus');
        localStorage.removeItem('username_invictus');
        localStorage.removeItem('foto_invictus');
        return null;
      }
    }
    return null;
  });

  const [cargando] = useState(false);

  const login = (datosUsuario) => {
    setUsuario(datosUsuario);
    localStorage.setItem('token_invictus', datosUsuario.token);
    localStorage.setItem('email_invictus', datosUsuario.email);
    localStorage.setItem('username_invictus', datosUsuario.username);
    if (datosUsuario.foto_url) {
      localStorage.setItem('foto_invictus', datosUsuario.foto_url);
    }
  };

  const logout = () => {
    setUsuario(null);
    localStorage.removeItem('token_invictus');
    localStorage.removeItem('email_invictus');
    localStorage.removeItem('username_invictus');
    localStorage.removeItem('foto_invictus');
  };

  const actualizarDatosUsuario = (nuevosDatos) => {
    setUsuario((prevUsuario) => {
      const usuarioActualizado = { ...prevUsuario, ...nuevosDatos };

      if (nuevosDatos.foto_url) {
        localStorage.setItem('foto_invictus', nuevosDatos.foto_url);
      }

      return usuarioActualizado;
    });
  };

  return (
    <AuthContext.Provider
      value={{ usuario, login, logout, cargando, actualizarDatosUsuario }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/* eslint-disable react-refresh/only-export-components */
export const useAuth = () => {
  return useContext(AuthContext);
};
