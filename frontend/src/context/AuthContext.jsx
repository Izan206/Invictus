/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(() => {
    const tokenGuardado = localStorage.getItem('token_invictus');
    const emailGuardado = localStorage.getItem('email_invictus');
    const usernameGuardado = localStorage.getItem('username_invictus');

    if (tokenGuardado && emailGuardado) {
      return {
        email: emailGuardado,
        token: tokenGuardado,
        username: usernameGuardado
      };
    }
    return null;
  });

  const [cargando] = useState(false);

  const login = (datosUsuario) => {
    setUsuario(datosUsuario);
    localStorage.setItem('token_invictus', datosUsuario.token);
    localStorage.setItem('email_invictus', datosUsuario.email);
    localStorage.setItem('username_invictus', datosUsuario.username);
  };
  const logout = () => {
    setUsuario(null);
    localStorage.removeItem('token_invictus');
    localStorage.removeItem('email_invictus');
    localStorage.removeItem('username_invictus');
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout, cargando }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
