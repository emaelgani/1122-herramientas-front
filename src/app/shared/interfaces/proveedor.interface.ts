import { Producto } from "./producto.interface"

export interface Proveedor {
  idProveedor: number,
  nombre: string,
  telefono: string,
  descripcion: string
  sumaGastoMensual: boolean,
  productos?: Producto[]
}


export interface ProveedorAumento {
  idProveedor: number,
  porcentaje: number
}
