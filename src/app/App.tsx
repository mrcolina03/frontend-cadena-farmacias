// src/App.tsx

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '@components/layout/MainLayout';

// Vistas del dominio Catálogo (asume que las has creado en src/domains/catalog/pages)
import MedicineListPage from '@domains/catalog/pages/MedicineListPage';
import ClientListPage from '@domains/catalog/pages/ClientListPage';
import PrescriptionListPage from '@domains/catalog/pages/PrescriptionListPage';

// Vistas del dominio Inventario (asume que las has creado en src/domains/inventario/pages)
import SucursalListPage from '@domains/Inventario/pages/SucursalListPage';
import StockPage from '@domains/Inventario/pages/InventarioSucursales';
import SucursalListPageInactivas from '@domains/Inventario/pages/SucursalListPageInactivas';

// 💡 Vistas del Dominio: Ventas (Adaptado del trabajo anterior)
import VentaDashboard from '@domains/ventas/VentaDashboard'; // Es el CRUD principal
import VentaDetalle from '@domains/ventas/VentaDetalle'; // Para ver detalles de una venta

// 💡 Vistas del Dominio: Reportes (Adaptado del trabajo anterior)
import ReportesDashboard from '@domains/reportes/ReportesDashboard';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta base que redirige a la lista de medicamentos */}
        <Route path="/" element={<Navigate to="/catalog/medicamentos" replace />} />
        
        {/* Usamos el MainLayout para todas las rutas de la aplicación */}
        <Route element={<MainLayout />}>
          
          {/* Rutas del Dominio: Catálogo */}
          <Route path="/catalog">
            <Route path="medicamentos" element={<MedicineListPage />} />
            <Route path="clientes" element={<ClientListPage />} />
            <Route path="prescripciones" element={<PrescriptionListPage />} />
          </Route>

          {/* 🚀 Rutas del Dominio: Ventas (CRUD Completo) */}
          <Route path="/ventas">
            <Route path="dashboard" element={<VentaDashboard />} /> {/* Vista principal CRUD */}
            <Route path="detalle/:id" element={<VentaDetalle />} /> {/* Detalle/Vista Única */}
          </Route>
          
          {/* 📈 Rutas del Dominio: Reportes (Dashboard) */}
          <Route path="/reportes">
            <Route path="dashboard" element={<ReportesDashboard />} />
          </Route>
          
          {/* Rutas del Dominio: Inventario */}
          <Route path="/inventario">
            <Route path="sucursal" element={<SucursalListPage />} />
            <Route path="sucursal/:sucursalId" element={<StockPage />} />
            <Route path="sucursal/inactivas" element={<SucursalListPageInactivas />} />
          </Route>

          {/* Manejo de rutas no encontradas (404) */}
          <Route path="*" element={<h1>404: Página no encontrada</h1>} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;