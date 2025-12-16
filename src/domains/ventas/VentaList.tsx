// src/domains/ventas/VentaList.tsx

import React, { useState, useEffect } from 'react';
import { Venta } from '../../types/api';
import { getVentas, deleteVenta } from '../../api/clients/ms-ventas/ventasApi';
import Card from '../../components/ui/Card'; // Asume la existencia

const VentaList: React.FC = () => {
  const [ventas, setVentas] = useState<Venta[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVentas();
  }, []);

  const fetchVentas = async () => {
    try {
      const data = await getVentas();
      setVentas(data);
    } catch (error) {
      console.error('Error al cargar ventas:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteVenta(id);
      // Actualizar la lista después de eliminar
      setVentas(ventas.filter(venta => venta.id !== id));
      alert('Venta eliminada con éxito');
    } catch (error) {
      console.error('Error al eliminar venta:', error);
    }
  };

  if (loading) return <p>Cargando ventas...</p>;

  return (
    <div>
      <h2>Lista de Ventas</h2>
      {ventas.map(venta => (
        <Card key={venta.id} style={{ marginBottom: '10px' }}>
          <p>ID: **{venta.id}** | Total: **${venta.total.toFixed(2)}** | Fecha: **{new Date(venta.fecha).toLocaleDateString()}**</p>
          <button onClick={() => handleDelete(venta.id)}>Eliminar</button>
          {/* Aquí se podría incluir un link/botón para VentaDetalle y VentaForm */}
        </Card>
      ))}
    </div>
  );
};

export default VentaList;