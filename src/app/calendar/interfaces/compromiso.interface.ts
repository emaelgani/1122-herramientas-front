import { Proveedor } from "src/app/shared/interfaces/proveedor.interface";

export interface Compromiso  {
  idCompromiso?: number,
  idProveedor?: number,
  monto?: number,
  estado?: boolean,
  fecha: string,
  proveedor?: Proveedor,
  pagoEfectivo?: number,
  pagoDigital?: number,
}
