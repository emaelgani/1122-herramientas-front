import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Venta, VentaCompleta, VentaProducto } from 'src/app/shared/interfaces/venta.interface';
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

  getProductosPorVenta(idVenta: number): Observable<VentaProducto[]>{
    return this.http.get<VentaProducto[]>(`${this.url}/api/Venta/${idVenta}/productos`);
  }


}
