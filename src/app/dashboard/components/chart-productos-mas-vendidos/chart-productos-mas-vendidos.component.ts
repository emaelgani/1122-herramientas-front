import { DatePipe } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { ProductoMasVendidoPorCliente } from 'src/app/shared/interfaces/venta.interface';
import { VentaService } from 'src/app/venta/services/venta.service';

interface datasetItem {
  type: string,
  label: string,
  backgroundColor: string,
  data: number[]
}

interface data {
  labels: string[],
  datasets: datasetItem[]
}

@Component({
  selector: 'app-chart-productos-mas-vendidos',
  templateUrl: './chart-productos-mas-vendidos.component.html',
  styleUrls: ['./chart-productos-mas-vendidos.component.css']
})
export class ChartProductosMasVendidosComponent implements OnInit {

  private ventaService = inject(VentaService);
  private documentStyle = getComputedStyle(document.documentElement);
  private startDate!: string;
  private endDate!: string;
  private datePipe = inject(DatePipe);
  data: any;
  options: any;


  ngOnInit() {
    //this.getCuatroProductosMasVendidosPorCliente('2022-07-06', '2024-07-06');
    this.createChart();
  }


  createChart(): any {

    this.data = {
      labels: [],
      datasets: []
    };


    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        tooltips: {
          mode: 'index',
          intersect: false
        },
        legend: {
          labels: {
            color: 'white',
          },
          display: false
        },
      },
      scales: {
        x: {
          stacked: true,
          ticks: {
            color: 'white'
          },
          grid: {
            color: 'gray',
            drawBorder: false
          }
        },
        y: {
          stacked: true,
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

  getCuatroProductosMasVendidosPorCliente(fechaInicio: string, fechaFin: string) {

    this.ventaService.getQuinceProductosMasVendidosPorCliente(fechaInicio, fechaFin)

      .subscribe({
        next: (res: ProductoMasVendidoPorCliente[]) => {

          this.createChart();

          this.data.labels = this.obtenerNombresProductos(res);
          this.data.datasets = this.createDataSet(res);

        },
      })
  }

  createDataSet(array: ProductoMasVendidoPorCliente[]): datasetItem[] {
    const dataset: datasetItem[] = [];

    // Obtener lista de clientes únicos
    const clientesUnicos: string[] = Array.from(
      new Set(array.map((producto) => producto.nombreCliente))
    );




    // Crear un datasetItem por cada cliente
    clientesUnicos.forEach((cliente, index) => {
      const data: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      const productosCliente = array.filter(
        (productoCliente) => productoCliente.nombreCliente === cliente
      );


      productosCliente.map((producto) => {
        const posicionProducto = this.encontrarPosicionEnArreglo(this.data.labels, producto.nombreProducto);
        data[posicionProducto] = producto.cantidadProductos;
      });
      const backgroundColor = `rgba(${this.getRandomRGBValue()}, ${this.getRandomRGBValue()}, ${this.getRandomRGBValue()}, 0.6)`;

      dataset.push({
        type: 'bar',
        label: cliente,
        backgroundColor,
        data,
      });
    });

    return dataset;
  }


  getRandomRGBValue(): number {
    return Math.floor(Math.random() * 256);
  }


  onStartDateChange(event: any) {
    const formattedEndDate = this.datePipe.transform(event.value, 'yyyy/MM/dd');
    this.startDate = formattedEndDate!;
  }

  onEndDateChange(event: any) {
    const formattedEndDate = this.datePipe.transform(event.value, 'yyyy/MM/dd');
    this.endDate = formattedEndDate!;

    if (this.startDate != null && this.endDate != null) {
      this.getCuatroProductosMasVendidosPorCliente(this.startDate, this.endDate);
    }
  }

  existeCliente(dataset: datasetItem[], cliente: string): boolean {
    for (const c of dataset) {
      if (c.label === cliente) {
        return true;
      }
    }
    return false;
  }


  obtenerNombresProductos(data: any[]): string[] {
    const nombresProductos: string[] = [];


    for (const item of data) {
      const nombreProducto = item.nombreProducto;

      if (!nombresProductos.includes(nombreProducto)) {
        nombresProductos.push(nombreProducto);
      }
    }

    return nombresProductos;
  }

  encontrarPosicionEnArreglo(arreglo: any[], item: any): number {
    for (let i = 0; i < arreglo.length; i++) {
      if (arreglo[i] === item) {
        return i;
      }
    }
    return -1; // Si el ítem no se encuentra en el arreglo, se devuelve -1
  }


}
