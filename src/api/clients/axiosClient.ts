import axios, { AxiosError } from 'axios';

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

// --- Nuevo Helper para Extracción de Mensajes de Error ---
export interface BackendErrorResponse {
  message: string;
  error: string;
  status: number;
  details?: string[]; // Para errores de validación
}

export const extractErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    const backendData = axiosError.response?.data as BackendErrorResponse;

    if (backendData) {
      let message = backendData.message;

      // Concatenar detalles de validación si existen
      if (backendData.details && Array.isArray(backendData.details) && backendData.details.length > 0) {
        // Enlazar los detalles a continuación del mensaje principal
        message += "\nDetalles:\n- " + backendData.details.join('\n- ');
      }
      
      return message;
    }

    // Fallback para errores de red o servidor sin cuerpo de respuesta JSON
    if (axiosError.request) {
      return `Error de red o conexión: ${axiosError.message}`;
    }
  }

  // Error desconocido
  return (error as Error).message || 'Error desconocido del sistema.';
};