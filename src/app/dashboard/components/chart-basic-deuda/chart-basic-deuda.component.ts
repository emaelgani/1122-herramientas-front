import { Component, OnInit, inject } from '@angular/core';
import { ClienteService } from 'src/app/cliente/services/cliente.service';
import { Cliente } from 'src/app/shared/interfaces/cliente.interface';

@Component({
  selector: 'app-chart-basic-deuda',
  templateUrl: './chart-basic-deuda.component.html',
  styleUrls: ['./chart-basic-deuda.component.css']
})
export class ChartBasicDeudaComponent implements OnInit {
  basicData: any;
  data: any;
  basicOptions: any;
  private clientesConDeuda!: Cliente[];
  private clienteService = inject(ClienteService);

  ngOnInit() {
    this.getCuatroClientesConMasDeuda();
  }

  createChart(){
    this.basicData = {
      labels: [],
      datasets: [
        {
          label: 'Deuda',
          data: [],
          backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'],
          borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
          borderWidth: 2
        }
      ]
    };

    this.basicOptions = {
      plugins: {
        legend: {
          labels: {
            color: 'white'
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: 'white'
          },
          grid: {
            color: 'gray',
            drawBorder: false
          }
        },
        x: {
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

  getCuatroClientesConMasDeuda() {
    this.clienteService.getCuatroClientesConMasDeuda()
      .subscribe({
        next: (res) => {
          this.createChart();
          this.clientesConDeuda = res;
          this.basicData.labels = this.clientesConDeuda.map(cliente => cliente.nombre);
          this.basicData.datasets[0].data = this.clientesConDeuda.map(cliente => cliente.deuda);



        },
        error: (err) => {
          console.error(err);
        }
      })
  }
}
