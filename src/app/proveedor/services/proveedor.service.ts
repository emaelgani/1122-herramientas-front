import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Proveedor } from 'src/app/shared/interfaces/proveedor.interface';
import { environments } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  private readonly baseUrl: string = environments.baseUrl;
  private http = inject(HttpClient);
  private url: string = this.baseUrl;

  constructor() { }

  getProveedores(): Observable<Proveedor[]>{
    return this.http.get<Proveedor[]>(`${this.url}/api/Proveedor`);
  }

  createProveedor(proveedor: Proveedor): Observable<Proveedor[]>{
    return this.http.post<Proveedor[]>(`${this.url}/api/Proveedor`, proveedor);
  }

  updateProveedor(proveedor: Proveedor): Observable<Proveedor[]>{
    if(!proveedor.idProveedor) throw Error('El id del proveedor es requerido');
    return this.http.put<Proveedor[]>(`${this.url}/api/Proveedor`, proveedor);
  }

  deleteProveedor(id: number): Observable<Proveedor[]>{
    return this.http.delete<Proveedor[]>(`${this.url}/api/Proveedor/${id}`);
  }
}
