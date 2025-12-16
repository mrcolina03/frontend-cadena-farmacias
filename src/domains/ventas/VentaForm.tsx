// src/domains/ventas/VentaForm.tsx

import React, { useState } from 'react';
import { VentaRequestDTO } from '../../types/api';
import { createVenta } from '../../api/clients/ms-ventas/ventasApi';
import Input from '../../components/ui/Input'; // Asume la existencia

const VentaForm: React.FC = () => {
  const [formData, setFormData] = useState<VentaRequestDTO>({
    clienteId: 0,
    sucursalId: 0,
    items: [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: parseInt(e.target.value) || e.target.value,
    } as VentaRequestDTO);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newVenta = await createVenta(formData);
      alert(`Venta #${newVenta.id} creada con éxito.`);
      // Limpiar formulario o redirigir
    } catch (error) {
      console.error('Error al crear venta:', error);
      alert('Hubo un error al crear la venta.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Crear Nueva Venta</h3>
      <Input name="clienteId" type="number" placeholder="ID Cliente" onChange={handleChange} required />
      <Input name="sucursalId" type="number" placeholder="ID Sucursal" onChange={handleChange} required />
      {/* Lógica más compleja para manejar la lista de 'items' (DetalleVentaDTO) */}
      <button type="submit">Guardar Venta</button>
    </form>
  );
};

export default VentaForm;