import { Component, ViewChild, inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PagoService } from '../../services/pago.service';
import { Pago } from 'src/app/shared/interfaces/pago.interface';

@Component({
  selector: 'app-pago-page',
  templateUrl: './pago-page.component.html',
  styleUrls: ['./pago-page.component.css']
})
export class PagoPageComponent {


  displayedColumns: string[] = ['idPago', 'cliente', 'fecha', 'metodoPago', 'totalPago'];
  dataSource!: MatTableDataSource<Pago>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private pagoService = inject(PagoService);

  constructor() {
    this.getPagos();

  }


  getPagos() {
    this.pagoService.getPagos()
    .subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        console.error(err);
      }
    })
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

