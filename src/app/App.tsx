import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '@components/layout/MainLayout';

// Vistas del dominio Catálogo (asume que las has creado en src/domains/catalog/pages)
import MedicineListPage from '@domains/catalog/pages/MedicineListPage';
import ClientListPage from '@domains/catalog/pages/ClientListPage';
import PrescriptionListPage from '@domains/catalog/pages/PrescriptionListPage';
// Nota: Puedes agregar una vista de detalle (ej. MedicineDetailsPage) más adelante

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta base que redirige a la lista de medicamentos */}
        <Route path="/" element={<Navigate to="/catalog/medicamentos" replace />} />
        
        {/* Usamos el MainLayout para todas las rutas del catálogo y futuras rutas */}
        <Route element={<MainLayout />}>
          
          {/* Rutas del Dominio: Catálogo */}
          <Route path="/catalog">
            <Route path="medicamentos" element={<MedicineListPage />} />
            <Route path="clientes" element={<ClientListPage />} />
            <Route path="prescripciones" element={<PrescriptionListPage />} />
          </Route>

          {/* 💡 Rutas Futuras de Ventas (ejemplo de escalabilidad) */}
          <Route path="/sales">
            {/* <Route path="orders" element={<OrderListPage />} /> */}
          </Route>
          
          {/* 💡 Rutas Futuras de Inventario */}
          <Route path="/inventory">
            {/* <Route path="stock" element={<StockPage />} /> */}
          </Route>

          {/* Manejo de rutas no encontradas (404) */}
          <Route path="*" element={<h1>404: Página no encontrada</h1>} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;