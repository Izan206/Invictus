import api from './api';

const authService = {
  registro: async (datosUsuario) => {
    const respuesta = await api.post('auth/register', datosUsuario);
    return respuesta.data;
  },

  login: async (credenciales) => {
    const respuesta = await api.post('auth/login', credenciales);
    return respuesta.data;
  }
};

export default authService;
