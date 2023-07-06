import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Pago } from 'src/app/shared/interfaces/pago.interface';
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
}
