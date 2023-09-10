import { Proveedor } from "./proveedor.interface";

export interface Producto  {
  idProducto?: number,
  nombre: string,
  marca: string,
  codigo: string;
  descripcion: string;
  precioContado: number;
  precioFinanciado: number;
  precioLista: number;
  stock: number;
  idProveedor: number;
  nombreProveedor?: string;
  cantidadVentas?: number,
  proveedor?: Proveedor;
  actualizado?: string;
}
