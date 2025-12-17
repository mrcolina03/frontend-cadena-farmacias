import React, { useState, useEffect } from 'react';
import { 
  Box, Button, TextField, Typography, Grid, IconButton, 
  Table, TableBody, TableContainer, TableCell, TableHead, TableRow, 
  Autocomplete, Paper, Alert, CircularProgress
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';

import { VentaService } from '../clients/VentaService';
import { ClientService } from '../../catalog/clients/ClientService';
import { MedicineService } from '../../catalog/clients/MedicineService';
// Importa el servicio de sucursales (ajusta la ruta según tu proyecto)
import { SucursalService } from '../../Inventario/clients/SucursalServices'; 

import { Client } from '../../catalog/types/Client';
import { Medicine } from '../../catalog/types/Medicine';
import { CreateVentaDTO } from '../types/Venta';
import { extractErrorMessage } from '@api/clients/axiosClient';

interface Props {
  onSuccess: () => void;
  onClose: () => void;
}

const VentaForm: React.FC<Props> = ({ onSuccess, onClose }) => {
  // Estados para datos de Catálogos e Inventario
  const [clients, setClients] = useState<Client[]>([]);
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [sucursales, setSucursales] = useState<any[]>([]); // Ajustar tipo según tu interface de Sucursal
  const [loadingCatalog, setLoadingCatalog] = useState(false);

  // Estados del Formulario
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [selectedSucursal, setSelectedSucursal] = useState<any | null>(null);
  const [cart, setCart] = useState<{ medicine: Medicine, quantity: number }[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setLoadingCatalog(true);
      try {
        const [resClients, resMedicines, resSucursales] = await Promise.all([
          ClientService.getAllClients(),
          MedicineService.getAllMedicines(),
          SucursalService.getAllSucursales() // Carga desde ms-inventario
        ]);
        setClients(resClients.data);
        setMedicines(resMedicines.data.filter((m: any) => m.activo));
        setSucursales(resSucursales.data);
      } catch (err) {
        setError("Error al cargar datos de catálogos o sucursales.");
      } finally {
        setLoadingCatalog(false);
      }
    };
    loadData();
  }, []);

  const addToCart = (medicine: Medicine | null) => {
    if (!medicine) return;
    const exists = cart.find(item => item.medicine.id === medicine.id);
    if (exists) {
      setCart(cart.map(item => 
        item.medicine.id === medicine.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { medicine, quantity: 1 }]);
    }
  };

  const removeItem = (id: number) => {
    setCart(cart.filter(item => item.medicine.id !== id));
  };

  const calculateTotal = () => cart.reduce((acc, item) => acc + (item.medicine.precio * item.quantity), 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClient) return setError("Debe seleccionar un cliente");
    if (!selectedSucursal) return setError("Debe seleccionar una sucursal");
    if (cart.length === 0) return setError("El carrito está vacío");

    // Construcción del DTO mapeado exactamente a VentaRequestDTO.java
    const ventaDTO: CreateVentaDTO = {
      clienteId: selectedClient.id!,
      sucursalId: selectedSucursal.id!,
      items: cart.map(item => ({
        medicamentoId: item.medicine.id!,
        cantidad: item.quantity
      }))
    };

    try {
      await VentaService.createVenta(ventaDTO);
      onSuccess();
    } catch (err) {
      setError(extractErrorMessage(err));
    }
  };

  if (loadingCatalog) return <Box p={3} textAlign="center"><CircularProgress /><Typography>Cargando datos...</Typography></Box>;

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Grid container spacing={3}>
        {/* Selección de Sucursal (ms-inventario) */}
        <Grid item xs={12} md={6}>
          <Autocomplete
            options={sucursales}
            getOptionLabel={(option) => option.nombre || `Sucursal ${option.id}`}
            onChange={(_, value) => setSelectedSucursal(value)}
            renderInput={(params) => <TextField {...params} label="Sucursal de Despacho" required variant="outlined" />}
          />
        </Grid>

        {/* Selección de Cliente (ms-catalogo) */}
        <Grid item xs={12} md={6}>
          <Autocomplete
            options={clients}
            getOptionLabel={(option) => `${option.cedula} - ${option.nombres} ${option.apellidos}`}
            onChange={(_, value) => setSelectedClient(value)}
            renderInput={(params) => <TextField {...params} label="Seleccionar Cliente" required variant="outlined" />}
          />
        </Grid>

        {/* Selección de Medicamento (ms-catalogo) */}
        <Grid item xs={12}>
          <Autocomplete
            options={medicines}
            getOptionLabel={(option) => `${option.nombre} - $${option.precio}`}
            onChange={(_, value) => addToCart(value)}
            renderInput={(params) => (
              <TextField 
                {...params} 
                label="Agregar Medicamento" 
                placeholder="Escriba el nombre del producto..." 
                variant="filled"
              />
            )}
          />
        </Grid>

        {/* Carrito / Tabla de Items */}
        <Grid item xs={12}>
          <TableContainer component={Paper} variant="outlined">
            <Table size="small">
              <TableHead sx={{ bgcolor: '#f5f5f5' }}>
                <TableRow>
                  <TableCell>Producto</TableCell>
                  <TableCell align="center">Cantidad</TableCell>
                  <TableCell align="right">Precio</TableCell>
                  <TableCell align="right">Subtotal</TableCell>
                  <TableCell align="center">Acción</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cart.map((item) => (
                  <TableRow key={item.medicine.id}>
                    <TableCell>{item.medicine.nombre}</TableCell>
                    <TableCell align="center">{item.quantity}</TableCell>
                    <TableCell align="right">${item.medicine.precio.toFixed(2)}</TableCell>
                    <TableCell align="right">${(item.medicine.precio * item.quantity).toFixed(2)}</TableCell>
                    <TableCell align="center">
                      <IconButton color="error" onClick={() => removeItem(item.medicine.id!)}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
                {cart.length > 0 && (
                  <TableRow>
                    <TableCell colSpan={3} align="right" sx={{ fontWeight: 'bold' }}>TOTAL:</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                      ${calculateTotal().toFixed(2)}
                    </TableCell>
                    <TableCell />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>

      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
        <Button onClick={onClose}>Cancelar</Button>
        <Button 
          type="submit" 
          variant="contained" 
          startIcon={<SaveIcon />} 
          disabled={cart.length === 0 || !selectedClient || !selectedSucursal}
        >
          Confirmar Venta
        </Button>
      </Box>
    </Box>
  );
};

export default VentaForm;