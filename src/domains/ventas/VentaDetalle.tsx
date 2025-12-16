// src/domains/ventas/VentaDetalle.tsx

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Asume que usas react-router
import { Venta } from '../../types/api';
import { getVentaById } from '../../api/clients/ms-ventas/ventasApi';

const VentaDetalle: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Obtener el ID de la URL
  const [venta, setVenta] = useState<Venta | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchVenta(parseInt(id));
    }
  }, [id]);

  const fetchVenta = async (ventaId: number) => {
    try {
      const data = await getVentaById(ventaId);
      setVenta(data);
    } catch (error) {
      console.error('Error al cargar detalle de venta:', error);
      setVenta(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Cargando detalle...</p>;
  if (!venta) return <p>Venta no encontrada.</p>;

  return (
    <div>
      <h2>Detalle de Venta #{venta.id}</h2>
      <p>Cliente ID: **{venta.clienteId}**</p>
      <p>Sucursal ID: **{venta.sucursalId}**</p>
      <p>Total: **${venta.total.toFixed(2)}**</p>
      <p>Fecha: **{new Date(venta.fecha).toLocaleString()}**</p>
      {/* Mostrar los detalles de los items de la venta si están disponibles */}
    </div>
  );
};

export default VentaDetalle;