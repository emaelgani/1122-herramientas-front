import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environments } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class FinanzasService {

  private readonly baseUrl: string = environments.baseUrl;
  private http = inject(HttpClient);
  private url: string = this.baseUrl;

  constructor() { }


  dowloadPdfSalida(): void {
    this.http.get(`${this.url}/api/Finanzas/DownloadGuiaSalida`, { responseType: 'blob' }).subscribe((blob: Blob) => {
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleDateString('es-AR').replace(/\//g, '-');
      const link = document.createElement('a');
      const url = window.URL.createObjectURL(blob);
      link.href = url;
      link.download = `salida-${formattedDate}.pdf`;
      link.click();
      window.URL.revokeObjectURL(url);
    });
  }
}
