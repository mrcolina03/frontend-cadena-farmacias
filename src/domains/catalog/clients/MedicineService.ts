import { axiosClient } from '@api/clients/axiosClient';
import type { Medicine, CreateMedicineDTO, UpdateMedicineDTO } from '../types/Medicine';

const BASE_PATH = '/medicamentos';

export const MedicineService = {
  // POST: Crear Medicamento
  createMedicine: (data: CreateMedicineDTO) => {
    return axiosClient.post<Medicine>(BASE_PATH, data);
  },

  // GET: Listar Todos los Medicamentos
  getAllMedicines: () => {
    return axiosClient.get<Medicine[]>(BASE_PATH);
  },

  // GET: Obtener Medicamento por ID
  getMedicineById: (id: number) => {
    return axiosClient.get<Medicine>(`${BASE_PATH}/${id}`);
  },

  // GET: Obtener Medicamento por Código
  getMedicineByCode: (codigo: string) => {
    return axiosClient.get<Medicine>(`${BASE_PATH}/codigo/${codigo}`);
  },

  // PUT: Actualizar Medicamento
  updateMedicine: (id: number, data: UpdateMedicineDTO) => {
    return axiosClient.put<Medicine>(`${BASE_PATH}/${id}`, data);
  },

  // DELETE: Desactivar Medicamento (Soft Delete)
  deactivateMedicine: (id: number) => {
    return axiosClient.delete(`${BASE_PATH}/${id}`);
  },
  
  // DELETE: Eliminar Medicamento (Hard Delete)
  deleteMedicinePermanently: (id: number) => {
    return axiosClient.delete(`${BASE_PATH}/${id}/permanente`);
  }
};