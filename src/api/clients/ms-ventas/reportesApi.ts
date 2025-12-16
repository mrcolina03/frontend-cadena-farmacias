// src/api/reportesApi.ts

import api from './axiosConfig';
import { Venta } from '../../../types/api';

const REPORTE_URL = '/reportes';

export const getReporteVentas = async (desde: string, hasta: string): Promise<Venta[]> => {
  const response = await api.get<Venta[]>(`${REPORTE_URL}/ventas`, {
    params: {
      desde, // Formato 'YYYY-MM-DD'
      hasta, // Formato 'YYYY-MM-DD'
    },
  });
  return response.data;
};