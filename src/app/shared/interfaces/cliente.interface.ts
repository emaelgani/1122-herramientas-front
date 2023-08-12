export interface Cliente {
  idCliente?: number;
  nombre:    string;
  telefono:  string;
  direccion:  string;
  deuda?:  number;
}

export interface ClienteCantidadProducto extends Cliente {
  ultimaVenta: string;
  cantidadVendidos: number;
}
