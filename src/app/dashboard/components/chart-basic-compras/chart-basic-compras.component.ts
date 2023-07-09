import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatDateRangePicker } from '@angular/material/datepicker';
import { UIChart } from 'primeng/chart';
import { VentasProductos } from 'src/app/shared/interfaces/venta.interface';
import { VentaService } from 'src/app/venta/services/venta.service';

@Component({
  selector: 'app-chart-basic-compras',
  templateUrl: './chart-basic-compras.component.html',
  styleUrls: ['./chart-basic-compras.component.css']
})
export class ChartBasicComprasComponent implements OnInit {

  @ViewChild('chart') chart!: UIChart;

  private productosPorVenta: VentasProductos[] = [];
  private ventaService = inject(VentaService);
  private datePipe = inject(DatePipe);

  public data: any;
  public options: any;

  private startDate!: string;
  private endDate!: string;



  ngOnInit() {
    this.createChart();
  }

  createChart(){
    const documentStyle = getComputedStyle(document.documentElement);

    this.data = {
      labels: '',
      datasets: [
        {
          label: 'Cantidad productos',
          backgroundColor: documentStyle.getPropertyValue('--blue-500'),
          borderColor: documentStyle.getPropertyValue('--blue-500'),
          data: []
        },
        {
          label: 'Cantidad ventas',
          backgroundColor: documentStyle.getPropertyValue('--pink-500'),
          borderColor: documentStyle.getPropertyValue('--pink-500'),
          data: []
        }
      ]
    };

    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
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
            color: 'white',
            font: {
              weight: 500
            }
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

  onStartDateChange(event: any) {
    const formattedEndDate = this.datePipe.transform(event.value, 'dd/MM/yyyy');
    this.startDate = formattedEndDate!;
  }

  onEndDateChange(event: any) {
    const formattedEndDate = this.datePipe.transform(event.value, 'dd/MM/yyyy');
    this.endDate = formattedEndDate!;

    if(this.startDate != null && this.endDate != null){
      this.getProductosPorVentas(this.startDate, this.endDate);
    }
  }


  getProductosPorVentas(fechaInicio: string, fechaFin: string) {

    this.ventaService.getProductosPorVentas(fechaInicio, fechaFin)

      .subscribe({
        next: (res: VentasProductos[]) => {

          this.createChart();
          this.productosPorVenta = res;
          // Obtener los nombres de los clientes y las cantidades de productos y ventas
          const nombresClientes = this.productosPorVenta.map(p => p.nombreCliente);
          const cantidadesProductos = this.productosPorVenta.map(p => p.cantidadProductos);
          const cantidadesVentas = this.productosPorVenta.map(p => p.cantidadVentas);

          // Asignar los valores a las propiedades data y labels
          this.data.labels = nombresClientes;
          this.data.datasets[0].data = cantidadesProductos;
          this.data.datasets[1].data = cantidadesVentas;

        },
      })
  }

}
