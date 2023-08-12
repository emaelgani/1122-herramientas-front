import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from 'src/app/shared/interfaces/producto.interface';
import { Proveedor } from 'src/app/shared/interfaces/proveedor.interface';
import { VentaCompleta } from 'src/app/shared/interfaces/venta.interface';
import { environments } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private readonly baseUrl: string = environments.baseUrl;
  private http = inject(HttpClient);
  private url: string = this.baseUrl;

  constructor() { }

  getProductos(): Observable<Producto[]>{
    return this.http.get<Producto[]>(`${this.url}/api/Producto`);
  }

  getTotalValorStock(): Observable<number>{
    return this.http.get<number>(`${this.url}/api/Producto/ValorTotalStock`);
  }

  getTotalValorStockFinanciado(): Observable<number>{
    return this.http.get<number>(`${this.url}/api/Producto/ValorTotalStockFinanciado`);
  }

  getTotalValorStockContado(): Observable<number>{
    return this.http.get<number>(`${this.url}/api/Producto/ValorTotalStockContado`);
  }

  updateProducto(producto: Producto): Observable<Producto[]>{
    if(!producto.idProducto) throw Error('El id del producto es requerido');
    return this.http.put<Producto[]>(`${this.url}/api/Producto`, producto);
  }

  createProducto(producto: Producto): Observable<Producto[]>{
    return this.http.post<Producto[]>(`${this.url}/api/Producto`, producto);
  }

  deleteProducto(id: number): Observable<Producto[]>{
    return this.http.delete<Producto[]>(`${this.url}/api/Producto/${id}`);
  }

  getProducto(id: number): Observable<Producto>{
    return this.http.get<Producto>(`${this.url}/api/Producto/${id}`);
  }



}
