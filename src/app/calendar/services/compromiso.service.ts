import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environments } from 'src/environments/environments';
import { Compromiso } from '../interfaces/compromiso.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompromisoService {

  private readonly baseUrl: string = environments.baseUrl;
  private http = inject(HttpClient);
  private url: string = this.baseUrl;


  constructor() { }

  createCompromiso(compromiso: Compromiso): Observable<Compromiso[]>{
    return this.http.post<Compromiso[]>(`${this.url}/api/Compromiso`, compromiso);
  }

  getCompromisos(): Observable<Compromiso[]>{
    return this.http.get<Compromiso[]>(`${this.url}/api/Compromiso`);
  }

  getCompromiso(id: number): Observable<Compromiso>{
    return this.http.get<Compromiso>(`${this.url}/api/Compromiso/${id}`);
  }

  MontoTotalCompromisosNoPagados(): Observable<number>{
    return this.http.get<number>(`${this.url}/api/Compromiso/MontoTotalCompromisosNoPagados`);
  }

  getTotalMontoCompromisosEfectivo(): Observable<number>{
    return this.http.get<number>(`${this.url}/api/Compromiso/MontoTotalEfectivo`);
  }

  getTotalMontoCompromisosDigital(): Observable<number>{
    return this.http.get<number>(`${this.url}/api/Compromiso/MontoTotalDigital`);
  }

  getCompromisosNoSaldadosHoy(): Observable<number>{
    return this.http.get<number>(`${this.url}/api/Compromiso/CompromisosNoSaldadosHoy`);
  }

  updateCompromiso(compromiso: Compromiso): Observable<Compromiso[]>{
    if(!compromiso.idCompromiso) throw Error('El id del compromiso es requerido');
    return this.http.put<Compromiso[]>(`${this.url}/api/Compromiso`, compromiso);
  }

  deleteCompromiso(idCompromiso: number): Observable<Compromiso[]>{
    return this.http.delete<Compromiso[]>(`${this.url}/api/Compromiso/${idCompromiso}`);
  }

  getGastos(fechaInicio: string, fechaFin: string): Observable<number>{
    return this.http.get<number>(`${this.url}/Gastos?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`);
  }
}
