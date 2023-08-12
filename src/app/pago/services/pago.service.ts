import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Pago, PagoPorMes, PagoYVentaPorMes } from 'src/app/shared/interfaces/pago.interface';
import { environments } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class PagoService {

  private readonly baseUrl: string = environments.baseUrl;
  private http = inject(HttpClient);
  private url: string = this.baseUrl;

  constructor() { }

  createPago(pago: Pago): Observable<Pago[]>{
    return this.http.post<Pago[]>(`${this.url}/api/Pago`, pago);
  }

  getPagos(): Observable<Pago[]>{
    return this.http.get<Pago[]>(`${this.url}/api/Pago`);
  }

  getPagosPorMes(): Observable<PagoPorMes[]>{
    return this.http.get<PagoPorMes[]>(`${this.url}/PagosPorMes`);
  }

  getPagosYVentaPorMes(): Observable<PagoYVentaPorMes>{
    return this.http.get<PagoYVentaPorMes>(`${this.url}/PagosYVentasPorMes`);
  }

  getLiquidezEfectivo(): Observable<number>{
    return this.http.get<number>(`${this.url}/api/Pago/LiquidezEfectivo`);
  }

  getLiquidezDigital(): Observable<number>{
    return this.http.get<number>(`${this.url}/api/Pago/LiquidezDigital`);
  }
}
