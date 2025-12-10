import React from 'react';
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Divider, Box, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import MedicationIcon from '@mui/icons-material/Medication';
import PeopleIcon from '@mui/icons-material/People';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InventoryIcon from '@mui/icons-material/Inventory';

const drawerWidth = 240;

interface NavItem {
  text: string;
  icon: React.ReactNode;
  path: string;
}

const sidebarItems: NavItem[] = [
  // --- Dominio Catálogo ---
  { text: 'Medicamentos', icon: <MedicationIcon />, path: '/catalog/medicamentos' },
  { text: 'Clientes', icon: <PeopleIcon />, path: '/catalog/clientes' },
  { text: 'Prescripciones', icon: <ReceiptLongIcon />, path: '/catalog/prescripciones' },
  
  // --- Futuros Dominios ---
  // Estos elementos ya dejan el espacio para escalar
  { text: 'Ventas (WIP)', icon: <ShoppingCartIcon />, path: '/sales/orders' },
  { text: 'Inventario (WIP)', icon: <InventoryIcon />, path: '/inventory/stock' },
];

const Sidebar: React.FC = () => {
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
          💊 Mi Farmacia
        </Typography>
      </Toolbar>
      <Divider />
      
      <List>
        <Box sx={{ p: 2, pb: 0 }}>
            <Typography variant="overline" color="text.secondary">
                Módulos de Catálogo
            </Typography>
        </Box>
        {sidebarItems.slice(0, 3).map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={NavLink}
              to={item.path}
              // Estilo para marcar el item activo
              sx={{ 
                '&.active': { 
                  backgroundColor: 'rgba(0, 0, 0, 0.08)',
                  color: 'primary.main',
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
      
      <Divider />
      
      {/* Sección para futuros módulos */}
      <List>
        <Box sx={{ p: 2, pb: 0 }}>
            <Typography variant="overline" color="text.secondary">
                Próximos Módulos
            </Typography>
        </Box>
        {sidebarItems.slice(3).map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton 
                component={NavLink}
                to={item.path}
                disabled={true} // Deshabilita temporalmente hasta que se implementen
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} secondary="(En desarrollo)" />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;