import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environments } from 'src/environments/environments';
import { catchError, Observable, throwError } from 'rxjs';
import { Cliente, ClienteCantidadProducto } from '../../shared/interfaces/cliente.interface';
import { Pedido } from 'src/app/shared/interfaces/pedido.interface';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private readonly baseUrl: string = environments.baseUrl;
  private http = inject(HttpClient);
  private url: string = this.baseUrl;

  constructor() { }


  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.url}/api/Cliente`)
      .pipe(
        // Capturamos el error
        catchError(this.handleError)
      );
  }

  getCuatroClientesConMasDeuda(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.url}/api/Cliente/CuatroConMasDeuda`);
  }

  updateCliente(cliente: Cliente): Observable<Cliente[]> {
    if (!cliente.idCliente) throw Error('El id del cliente es requerido');
    return this.http.put<Cliente[]>(`${this.url}/api/Cliente`, cliente);
  }

  createCliente(cliente: Cliente): Observable<Cliente[]> {
    return this.http.post<Cliente[]>(`${this.url}/api/Cliente`, cliente);
  }

  deleteCliente(id: number): Observable<Cliente[]> {
    return this.http.delete<Cliente[]>(`${this.url}/api/Cliente/${id}`);
  }

  createNota(pedido: Pedido) {
    return this.http.post<Pedido[]>(`${this.url}/api/Pedido`, pedido);
  }

  getTotalDeuda(): Observable<number> {
    return this.http.get<number>(`${this.url}/api/Cliente/TotalDeuda`);
  }

  getClientesVentaProducto(idProducto: number): Observable<ClienteCantidadProducto[]> {
    return this.http.get<ClienteCantidadProducto[]>(`${this.url}/api/Cliente/ClientesCompraronProducto/${idProducto}`);
  }

  // Manejador de errores
  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      // Error en el lado del cliente
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      // Error en el lado del servidor
      errorMessage = `Server-side error: ${error.status} - ${error.message}`;
    }

    // Aquí podrías mostrar una alerta o notificación de error
    console.error(errorMessage);

    // Retornar un observable con el error para que pueda ser gestionado por el componente que consume el servicio
    return throwError(() => new Error(errorMessage));
  }
}
