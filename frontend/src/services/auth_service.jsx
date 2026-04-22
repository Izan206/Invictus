import axios from 'axios';

const API_BACKEND = 'http://127.0.0.1:5000/auth/';

const authService = {
  registro: async (datosUsuario) => {
    const respuesta = await axios.post(API_BACKEND + 'register', datosUsuario);
    return respuesta;
  },

  login: async (credenciales) => {
    const respuesta = await axios.post(API_BACKEND + 'login', credenciales);
    return respuesta.data;
  }
};

export default authService;
