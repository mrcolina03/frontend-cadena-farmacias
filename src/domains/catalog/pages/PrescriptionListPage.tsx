import React, { useState, useEffect } from 'react';
import { Medicine } from '../types/Medicine';
import { MedicineService } from '../clients/MedicineService';
import { Container, Typography, Box, Alert, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const PrescriptionListPage: React.FC = () => {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // 📞 Llamada al servicio API previamente definido
        const response = await MedicineService.getAllMedicines();
        setMedicines(response.data);
        
      } catch (err) {
        console.error("Error al obtener medicamentos:", err);
        setError('No se pudieron cargar los medicamentos. Verifique la conexión al backend.');
      } finally {
        setLoading(false);
      }
    };

    fetchMedicines();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Cargando catálogo...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        💊 Listado de Medicamentos
      </Typography>
      
      {medicines.length === 0 ? (
        <Alert severity="info">No hay medicamentos registrados en el catálogo.</Alert>
      ) : (
        <TableContainer component={Paper}>
          <Table aria-label="medicine table">
            <TableHead>
              <TableRow>
                <TableCell>Código</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Laboratorio</TableCell>
                <TableCell align="right">Precio</TableCell>
                <TableCell>Receta Req.</TableCell>
                <TableCell>Vencimiento</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {medicines.map((medicine) => (
                <TableRow key={medicine.id}>
                  <TableCell component="th" scope="row">{medicine.codigo}</TableCell>
                  <TableCell>{medicine.nombre}</TableCell>
                  <TableCell>{medicine.laboratorio}</TableCell>
                  <TableCell align="right">${medicine.precio.toFixed(2)}</TableCell>
                  <TableCell>{medicine.requiereReceta ? 'Sí' : 'No'}</TableCell>
                  <TableCell>{medicine.fechaVencimiento || 'N/A'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default PrescriptionListPage;