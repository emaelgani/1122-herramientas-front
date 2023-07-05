import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Pedido } from 'src/app/shared/interfaces/pedido.interface';
import { environments } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  private readonly baseUrl: string = environments.baseUrl;
  private http = inject(HttpClient);
  private url: string = this.baseUrl;

  constructor() { }

  getPedidos(): Observable<Pedido[]>{
    return this.http.get<Pedido[]>(`${this.url}/api/Pedido`);
  }

  changeStatus(id: number): Observable<Pedido[]>{
    return this.http.post<Pedido[]>(`${this.url}/api/Pedido/${id}/changestatus`, null);
  }

  deletePedido(id: number): Observable<Pedido[]>{
    return this.http.delete<Pedido[]>(`${this.url}/api/Pedido/${id}`);
  }
}
