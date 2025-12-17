// src/api/axiosConfig.ts

import axios from 'axios';

const VITE_VENTAS_URL = import.meta.env.VITE_API_VENTAS_URL;

const api = axios.create({
  baseURL: VITE_VENTAS_URL, // Ajusta el puerto si es necesario
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;