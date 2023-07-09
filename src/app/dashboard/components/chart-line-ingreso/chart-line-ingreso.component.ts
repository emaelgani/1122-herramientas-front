import { Component, OnInit, inject } from '@angular/core';
import { VentaPorMes } from 'src/app/shared/interfaces/venta.interface';
import { VentaService } from 'src/app/venta/services/venta.service';

@Component({
  selector: 'app-chart-line-ingreso',
  templateUrl: './chart-line-ingreso.component.html',
  styleUrls: ['./chart-line-ingreso.component.css']
})
export class ChartLineIngresoComponent implements OnInit {

  private ventaService = inject(VentaService);
  basicData: any;
  data: any;
  options: any;

  ngOnInit() {


    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: 'white'
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: 'white'
          },
          grid: {
            color: 'gray',
            drawBorder: false
          }
        },
        y: {
          ticks: {
            color: 'white'
          },
          grid: {
            color: 'gray',
            drawBorder: false
          }
        }
      }
    };
    this.getVentasPorMes();
  }



  getVentasPorMes() {
    this.ventaService.getVentasPorMes()
      .subscribe({
        next: (res: VentaPorMes[]) => {

          //Año actual
          const currentYear = new Date().getFullYear();
          // Filtrar los resultados para obtener solo los del año actual
          const ventasPorMesActual = res.filter(v => v.anio === currentYear);
          // Obtener los nombres de los meses y los totales de ventas
          const labels = ventasPorMesActual.map(v => this.getMonthName(v.mes));
          const data: number[] = ventasPorMesActual.map(v => v.totalVentas);


          this.data = {
            labels: labels,
            datasets: [
              {
                label: `Ingreso por mes del año ${currentYear}`,
                data: data,
                fill: false,
                borderColor: '#3f51b5',
                tension: 0
              }
            ]
          };
        },
        error: (err) => {
          console.error(err);
        }
      })
  }

  private getMonthName(month: number): string {
    const monthNames = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    return monthNames[month - 1];
  }
}
