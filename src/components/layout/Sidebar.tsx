// src/components/layout/Sidebar.tsx

import React from 'react';
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Divider, Box, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';

// Iconos existentes
import MedicationIcon from '@mui/icons-material/Medication';
import PeopleIcon from '@mui/icons-material/People';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import StoreIcon from '@mui/icons-material/Store';
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';

// Iconos para Ventas y Reportes
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout'; // Para el CRUD de Ventas
import BarChartIcon from '@mui/icons-material/BarChart'; // Para el Dashboard de Reportes

const drawerWidth = 300;

interface NavItem {
  text: string;
  icon: React.ReactNode;
  path: string;
}

const sidebarItems: NavItem[] = [
  // --- Dominio Ventas ---
  { text: 'Ventas (CRUD)', icon: <ShoppingCartCheckoutIcon />, path: '/ventas/dashboard' },
  { text: 'Dashboard Reportes', icon: <BarChartIcon />, path: '/reportes/dashboard' },
  
  // --- Dominio Catálogo ---
  { text: 'Medicamentos', icon: <MedicationIcon />, path: '/catalog/medicamentos' },
  { text: 'Clientes', icon: <PeopleIcon />, path: '/catalog/clientes' },
  { text: 'Prescripciones', icon: <ReceiptLongIcon />, path: '/catalog/prescripciones' },

  // --- Dominio Inventario ---
  { text: 'Sucursales Activas', icon: <StoreIcon />, path: '/inventario/sucursal' },
  { text: 'Sucursales Inactivas', icon: <StoreOutlinedIcon />, path: '/inventario/sucursal/inactivas' },
];

const Sidebar: React.FC = () => {

  // Definimos los índices para facilitar el corte de las listas
  const ventasReportes = sidebarItems.slice(0, 2); // Items 0 y 1
  const catalogo = sidebarItems.slice(2, 5);      // Items 2, 3 y 4
  const inventario = sidebarItems.slice(5, 7);    // Items 5 y 6

  const renderNavSection = (title: string, items: NavItem[]) => (
    <List>
      <Box sx={{ p: 2, pb: 0 }}>
          <Typography variant="overline" color="text.secondary">
              {title}
          </Typography>
      </Box>
      {items.map((item) => (
        <ListItem key={item.text} disablePadding>
          <ListItemButton
            component={NavLink}
            to={item.path}
            // Estilo para marcar el item activo
            sx={{ 
              '&.active': { 
                backgroundColor: 'rgba(0, 0, 0, 0.08)',
                color: 'primary.main',
                fontWeight: 'bold',
                '& .MuiListItemIcon-root': {
                  color: 'primary.main',
                },
              },
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          Cadena de Farmacias
        </Typography>
      </Toolbar>
      <Divider />
      
      {/* 🚀 Sección de Ventas y Reportes */}
      {renderNavSection('Ventas y Análisis', ventasReportes)}
      <Divider />

      {/* 📋 Sección de Catálogo */}
      {renderNavSection('Módulos de Catálogo', catalogo)}
      <Divider />
      
      {/* 📦 Sección de Inventario */}
      {renderNavSection('Inventario', inventario)}
      
      {/* Nota: Eliminé la sección "Próximos Módulos" ya que Ventas y Reportes ya están implementados */}
    </Drawer>
  );
};

export default Sidebar;