import { Component, OnInit, inject } from '@angular/core';
import { map } from 'rxjs';
import { ProveedorService } from 'src/app/proveedor/services/proveedor.service';
import { Producto } from 'src/app/shared/interfaces/producto.interface';
import { Proveedor } from 'src/app/shared/interfaces/proveedor.interface';
import { VentaPorMes } from 'src/app/shared/interfaces/venta.interface';
import { VentaService } from 'src/app/venta/services/venta.service';

interface ProductoSelect {
  idProducto: number;
  name: string;
}

interface ProductoGroup {
  disabled?: boolean;
  name: string;
  productos: ProductoSelect[];
}




@Component({
  selector: 'app-chart-line-producto-vendido-por-mes',
  templateUrl: './chart-line-producto-vendido-por-mes.component.html',
  styleUrls: ['./chart-line-producto-vendido-por-mes.component.css']
})
export class ChartLineProductoVendidoPorMesComponent implements OnInit {

  public productos: ProductoGroup[] = [
  ];

  private ventaService = inject(VentaService);
  private proveedorService = inject(ProveedorService);

  data: any;
  options: any;

  ngOnInit() {
    this.createChart();
    this.getProductosPorProveedor();
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

  getVentasProductoPorMes(idProducto: number) {

    this.ventaService.getVentasProductoPorMes(idProducto)
      .subscribe({
        next: (res: VentaPorMes[]) => {
          this.createChart();
          this.setLabels();

          //Año actual
          const currentYear = new Date().getFullYear();

          let dataTotal: number[] = [];

          for (let index = 0; index < res.length; index++) {

            let indice: number = res.at(index)!.mes;
            dataTotal[indice - 1] = res.at(index)!.totalVentas;
          }

          this.data.datasets[0].label = `Cantidad de ${res[0].nombreProducto} vendidos por mes del año ${currentYear}`;
          this.data.datasets[0].data = dataTotal;
          this.data.datasets[0].fill = false;
          this.data.datasets[0].borderColor = '#5565FA';
          this.data.datasets[0].backgroundColor = '#5569FA6B';
          this.data.datasets[0].tesion = 0;

        },
        error: (err: any) => {
          console.error(err);
        }
      });
  }

  getProductosPorProveedor() {
    this.proveedorService.getProveedores()
      .pipe(
        map((res: Proveedor[]) => {
          return res.map((proveedor: Proveedor) => {
            const productos = proveedor.productos?.map((producto: Producto) => ({
              idProducto: producto.idProducto,
              name: producto.nombre,
            })) || [];

            return {
              disabled: false,
              name: proveedor.nombre,
              productos: productos
            };
          }).sort((a, b) => a.name.localeCompare(b.name)); // Ordenar por proveedor.nombre
        })
      )
      .subscribe({
        next: (res: any) => {
          this.productos = res;
        },
        error: (err) => {
          console.error(err);
        }
      });
  }


  onLabelSelected(event: any) {

    if(event.value){
      this.getVentasProductoPorMes(event.value);
    }


  }


}
