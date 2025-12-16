// src/domains/reportes/ReportesDashboard.tsx

import React, { useState } from 'react';
import PageContainer from '../../components/layout/layout/PageContainer';
import { Venta } from '../../types/api';
import { getReporteVentas } from '../../api/clients/ms-ventas/reportesApi';

const ReportesDashboard: React.FC = () => {
  const [reporteData, setReporteData] = useState<Venta[]>([]);
  const [desde, setDesde] = useState('');
  const [hasta, setHasta] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Cálculo básico del total para el dashboard
  const totalVentas = reporteData.reduce((sum, venta) => sum + venta.total, 0);

  const fetchReporte = async () => {
    if (!desde || !hasta) {
      alert('Por favor, selecciona las fechas de inicio y fin.');
      return;
    }
    setLoading(true);
    try {
      const data = await getReporteVentas(desde, hasta);
      setReporteData(data);
    } catch (error) {
      console.error('Error al cargar reporte:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer title="Dashboard de Reportes">
      
      {/* Controles de Fecha */}
      <div>
        <label>Desde: <input type="date" value={desde} onChange={(e) => setDesde(e.target.value)} /></label>
        <label style={{ marginLeft: '10px' }}>Hasta: <input type="date" value={hasta} onChange={(e) => setHasta(e.target.value)} /></label>
        <button onClick={fetchReporte} disabled={loading} style={{ marginLeft: '10px' }}>
          {loading ? 'Generando...' : 'Generar Reporte'}
        </button>
      </div>

      <hr style={{ margin: '20px 0' }} />

      {/* Indicadores Clave del Dashboard */}
      <div style={{ display: 'flex', gap: '20px' }}>
        <div style={{ border: '1px solid #ccc', padding: '15px' }}>
          <h3>Total de Ventas:</h3>
          <p style={{ fontSize: '1.5em' }}>${totalVentas.toFixed(2)}</p>
        </div>
        <div style={{ border: '1px solid #ccc', padding: '15px' }}>
          <h3># Transacciones:</h3>
          <p style={{ fontSize: '1.5em' }}>{reporteData.length}</p>
        </div>
        {/* Más métricas aquí (Venta promedio, Top productos, etc.) */}
      </div>

      <h3 style={{ marginTop: '30px' }}>Detalle de Ventas ({reporteData.length} resultados)</h3>
      {/* Aquí podrías poner un componente de tabla o gráfico */}
      <ul>
        {reporteData.map(venta => (
          <li key={venta.id}>Venta #{venta.id}: ${venta.total.toFixed(2)} ({new Date(venta.fecha).toLocaleDateString()})</li>
        ))}
      </ul>

    </PageContainer>
  );
};

export default ReportesDashboard;