import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Venta, VentaCompleta } from 'src/app/shared/interfaces/venta.interface';
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

}
