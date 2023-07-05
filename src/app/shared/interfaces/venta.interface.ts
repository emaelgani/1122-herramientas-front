export interface Venta {
  idVenta?: number;
  idCliente?: number;
  fecha: string;
  totalVenta?: number;
}

export interface VentaProducto {
  idVentaProducto?: number;
  idVenta?: number;
  idProducto: number;
  idTipoPrecio: number;
  cantidad: number;
  esPrecioEspecial: boolean;
  precioUnidad: number;
  total: number;
}

export interface VentaCompleta {
  venta: Venta;
  productos: VentaProducto[];
}

