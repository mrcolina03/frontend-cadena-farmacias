// src/api/ventasApi.ts

import api from './axiosConfig';
import { Venta, VentaRequestDTO } from '../../../types/api';

const VENTA_URL = '/ventas';

export const getVentas = async (): Promise<Venta[]> => {
  const response = await api.get<Venta[]>(VENTA_URL);
  return response.data;
};

export const getVentaById = async (id: number): Promise<Venta> => {
  const response = await api.get<Venta>(`${VENTA_URL}/${id}`);
  return response.data;
};

export const createVenta = async (data: VentaRequestDTO): Promise<Venta> => {
  const response = await api.post<Venta>(VENTA_URL, data);
  return response.data;
};

export const deleteVenta = async (id: number): Promise<void> => {
  await api.delete(`${VENTA_URL}/${id}`);
};

// Nota: No tienes endpoint de PUT/Actualización, pero se podría añadir aquí