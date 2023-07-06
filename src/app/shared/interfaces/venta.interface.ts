export interface Venta {
  idVenta?: number;
  idCliente?: number;
  fecha: string;
  totalVenta?: number;
  cliente?: string;
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
  proveedor?: string,
  descripcion?: string,
  tipoPrecio?: string,
}

export interface VentaCompleta {
  venta: Venta;
  productos: VentaProducto[];
}

