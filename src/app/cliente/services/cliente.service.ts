import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environments } from 'src/environments/environments';
import { Observable } from 'rxjs';
import { Cliente } from '../interfaces/cliente.interface';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private readonly baseUrl: string = environments.baseUrl;
  private http = inject(HttpClient);
  private url: string = `${this.baseUrl}/api/Cliente`;
  constructor() { }


  getClientes(): Observable<Cliente[]>{
    return this.http.get<Cliente[]>(this.url);
  }

  updateCliente(cliente: Cliente): Observable<Cliente[]>{
    if(!cliente.idCliente) throw Error('El id del cliente es requerido');
    return this.http.put<Cliente[]>(this.url, cliente);
  }

  createCliente(cliente: Cliente): Observable<Cliente[]>{
    return this.http.post<Cliente[]>(this.url, cliente);
  }

  deleteCliente(id: number): Observable<Cliente[]>{
    return this.http.delete<Cliente[]>(`${this.url}/${id}`);
  }



}
