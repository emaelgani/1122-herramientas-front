export interface Pago {
  idCliente?: number,
  idMetodoPago: number,
  totalPago: number,
  fecha: string,
  cliente?: string,
  metodoPago?: string
}
