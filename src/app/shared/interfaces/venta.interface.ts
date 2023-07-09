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

export interface VentaPorMes {
  totalVentas: number;
  mes: number;
  anio: number;
}

export interface VentasProductos {
  nombreCliente: string;
  cantidadProductos: number;
  cantidadVentas: number;
}

export interface ProductoMasVendidoPorCliente {
  nombreCliente: string;
  nombreProducto: string;
  cantidadProductos: number;
}

