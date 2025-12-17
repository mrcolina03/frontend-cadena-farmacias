import React from 'react';
import { Paper, Typography, Table, TableBody, TableCell, TableHead, TableRow,TableContainer } from '@mui/material';
import { ReporteVenta } from '../types/Reporte';

interface Props {
  data: ReporteVenta[];
}

const ReporteChart: React.FC<Props> = ({ data }) => {
  return (
    <Paper sx={{ p: 3, mt: 3 }}>
      <Typography variant="h6" gutterBottom>Desglose Diario de Ventas</Typography>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Fecha</TableCell>
              <TableCell align="center">Núm. Transacciones</TableCell>
              <TableCell align="right">Total Día</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.fecha}>
                <TableCell>{new Date(row.fecha).toLocaleDateString()}</TableCell>
                <TableCell align="center">{row.cantidadVentas}</TableCell>
                <TableCell align="right">${row.totalRecaudado.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default ReporteChart;