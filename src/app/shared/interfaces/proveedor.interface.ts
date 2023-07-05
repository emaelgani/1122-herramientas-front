import { Producto } from "./producto.interface"

export interface Proveedor {
  idProveedor: number,
  nombre: string,
  telefono: string,
  descripcion: string
  productos?: Producto[]
}
