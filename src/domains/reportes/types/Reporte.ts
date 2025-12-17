export interface ReporteVenta {
  fecha: string;
  cantidadVentas: number;
  totalRecaudado: number;
}

export interface ProductoMasVendido {
  nombre: string;
  cantidad: number;
  ingresos: number;
}

export interface ResumenReporte {
  totalVentas: number;
  totalIngresos: number;
  periodo: string;
  datosGrafico: ReporteVenta[];
  productosTop: ProductoMasVendido[];
}