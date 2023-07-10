import { VentaPorMes } from "./venta.interface";

export interface Pago {
  idCliente?: number,
  idMetodoPago: number,
  totalPago: number,
  fecha: string,
  cliente?: string,
  metodoPago?: string
}
export interface PagoPorMes {
  totalPagos: number;
  mes: number;
  anio: number;
}


export interface PagoYVentaPorMes{
  ventas:  VentaPorMes[],
  pagos:  PagoPorMes[]
}
