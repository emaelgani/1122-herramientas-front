import { Component, OnInit, inject } from '@angular/core';
import { PagoService } from 'src/app/pago/services/pago.service';
import { PagoPorMes, PagoYVentaPorMes } from 'src/app/shared/interfaces/pago.interface';
import { VentaPorMes } from 'src/app/shared/interfaces/venta.interface';
import { VentaService } from 'src/app/venta/services/venta.service';

@Component({
  selector: 'app-chart-line-ingreso',
  templateUrl: './chart-line-ingreso.component.html',
  styleUrls: ['./chart-line-ingreso.component.css']
})
export class ChartLineIngresoComponent implements OnInit {



  private pagoService = inject(PagoService);
  data: any;
  options: any;

  ngOnInit() {
    this.getPagosYVentasPorMes();
  }


  createChart() {
    const documentStyle = getComputedStyle(document.documentElement);

    this.data = {
      datasets: [
        {
          label: '',
          data: [],
          fill: false,
          borderColor: documentStyle.getPropertyValue('--blue-500'),
          tension: 0
        },
        {
          label: '',
          data: [],
          fill: false,
          borderColor: documentStyle.getPropertyValue('--pink-500'),
          tension: 0
        }
      ]
    };

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
  }

  setLabels() {
    this.data.labels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  }

  getPagosYVentasPorMes() {

    this.pagoService.getPagosYVentaPorMes()
      .subscribe({
        next: (res: PagoYVentaPorMes) => {
          this.createChart();
          this.setLabels();

          //Año actual
          const currentYear = new Date().getFullYear();

          let dataTotal: number[] = [];

          for (let index = 0; index < res.ventas.length; index++) {

            let indice: number = res.ventas.at(index)!.mes;
            dataTotal[indice - 1] = res.ventas.at(index)!.totalVentas;
          }


          this.data.datasets[0].label = `Ventas por mes del año ${currentYear}`;
          this.data.datasets[0].data = dataTotal;
          this.data.datasets[0].fill = false;
          this.data.datasets[0].borderColor = '#5565FA';
          this.data.datasets[0].backgroundColor = '#5569FA6B';
          this.data.datasets[0].tesion = 0;


          let dataTotalPagos: number[] = [];

          for (let index = 0; index < res.pagos.length; index++) {

            let indice: number = res.pagos.at(index)!.mes;
            dataTotalPagos[indice - 1] = res.pagos.at(index)!.totalPagos;
          }


          this.data.datasets[1].label = `Pagos por mes del año ${currentYear}`;
          this.data.datasets[1].data = dataTotalPagos;
          this.data.datasets[1].fill = false;
          this.data.datasets[1].borderColor = '#FA5596';
          this.data.datasets[1].backgroundColor = '#FA559666';
          this.data.datasets[1].tesion = 0;


        },
        error: (err) => {
          console.error(err);
        }
      });
  }



}
