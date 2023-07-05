import { Cliente } from "./cliente.interface";

export interface Pedido  {
  idPedido: number,
  idCliente: number,
  descripcion: string;
  fecha: string;
  estado: string;
  cliente: Cliente;
  nombreCliente?:  string;
}
