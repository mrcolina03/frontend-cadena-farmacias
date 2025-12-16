// src/domains/ventas/VentaDashboard.tsx (Usado como vista principal del CRUD de Ventas)

import React from 'react';
import PageContainer from '../../components/layout/layout/PageContainer';
import VentaList from './VentaList';
import VentaForm from './VentaForm';

const VentaDashboard: React.FC = () => {
  return (
    <PageContainer title="Gestión de Ventas (CRUD)">
      <div style={{ display: 'flex', gap: '20px' }}>
        <div style={{ flex: 1 }}>
          <VentaForm /> {/* Create/Update Form */}
        </div>
        <div style={{ flex: 2 }}>
          <VentaList /> {/* Read/Delete List */}
        </div>
      </div>
      {/* Nota: VentaDetalle se manejaría con rutas separadas */}
    </PageContainer>
  );
};

export default VentaDashboard;