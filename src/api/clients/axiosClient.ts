import axios from 'axios';

// La URL base se debe configurar como una variable de entorno en el entorno de ejecución
// Para desarrollo local, puedes usar la variable por defecto de Postman: http://localhost:8081/api/catalogo
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081/api/catalogo';

export const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // Puedes agregar interceptores aquí para manejo de errores global, tokens, etc.
});