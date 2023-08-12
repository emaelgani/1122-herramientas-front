import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Proveedor, ProveedorAumento } from 'src/app/shared/interfaces/proveedor.interface';
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

  aumentarPorcentajeProveedor(proveedorAumento: ProveedorAumento): Observable<Proveedor[]>{
    if(!proveedorAumento.idProveedor) throw Error('El id del proveedor es requerido');
    return this.http.post<Proveedor[]>(`${this.url}/AumentarPorcentaje`, proveedorAumento);
  }

  updateProveedor(proveedor: Proveedor): Observable<Proveedor[]>{
    if(!proveedor.idProveedor) throw Error('El id del proveedor es requerido');
    return this.http.put<Proveedor[]>(`${this.url}/api/Proveedor`, proveedor);
  }

  deleteProveedor(id: number): Observable<Proveedor[]>{
    return this.http.delete<Proveedor[]>(`${this.url}/api/Proveedor/${id}`);
  }

  dowloadPdfPrecioLista(idProveedor: number): void {
    this.http.get(`${this.url}/api/Proveedor/DownloadPrecioLista?idProveedor=${idProveedor}`, { responseType: 'blob' }).subscribe((blob: Blob) => {
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleDateString('es-AR').replace(/\//g, '-');
      const link = document.createElement('a');
      const url = window.URL.createObjectURL(blob);
      link.href = url;
      link.download = `precio-lista-${formattedDate}.pdf`;
      link.click();
      window.URL.revokeObjectURL(url);
    });
  }
}
