import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CobranzaYVenta, ProductoMasVendidoPorCliente, Venta, VentaCompleta, VentaPorMes, VentaProducto, VentasProductos } from 'src/app/shared/interfaces/venta.interface';
import { environments } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  private readonly baseUrl: string = environments.baseUrl;
  private http = inject(HttpClient);
  private url: string = this.baseUrl;

  constructor() { }


  createVenta(ventaCompleta: VentaCompleta): Observable<Venta[]>{
    return this.http.post<Venta[]>(`${this.url}/api/Venta`, ventaCompleta);
  }

  getVentas(): Observable<Venta[]>{
    return this.http.get<Venta[]>(`${this.url}/api/Venta`);
  }

  getVentasPorMes(): Observable<VentaPorMes[]>{
    return this.http.get<VentaPorMes[]>(`${this.url}/VentasPorMes`);
  }

  getVentasProductoPorMes(idProducto: number): Observable<VentaPorMes[]>{
    return this.http.get<VentaPorMes[]>(`${this.url}/VentasPorMesByIdProducto?idProducto=${idProducto}`);
  }

  getProductosPorVentas(fechaInicio: string, fechaFin: string): Observable<VentasProductos[]> {
    return this.http.get<VentasProductos[]>(`${this.url}/ProductosPorVentas?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`);
  }

  getQuinceProductosMasVendidosPorCliente(fechaInicio: string, fechaFin: string): Observable<ProductoMasVendidoPorCliente[]> {
    return this.http.get<ProductoMasVendidoPorCliente[]>(`${this.url}/QuinceProductosMasVendidosPorCliente?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`);
  }

  getProductosPorVenta(idVenta: number): Observable<VentaProducto[]>{
    return this.http.get<VentaProducto[]>(`${this.url}/api/Venta/${idVenta}/productos`);
  }

  getCobranzasYVentas(fechaInicio: string, fechaFin: string): Observable<CobranzaYVenta>{
    return this.http.get<CobranzaYVenta>(`${this.url}/CobranzasYVentas?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`);
  }

}
