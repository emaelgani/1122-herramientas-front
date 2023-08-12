import { Component, Inject, ViewChild, inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Cliente, ClienteCantidadProducto } from '../../../shared/interfaces/cliente.interface';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FinanzasService } from 'src/app/finanzas/services/finanzas.service';
import { ClienteService } from 'src/app/cliente/services/cliente.service';

@Component({
  selector: 'app-dialog-cliente-ventas',
  templateUrl: './dialog-cliente-ventas.component.html',
  styleUrls: ['./dialog-cliente-ventas.component.css']
})
export class DialogClienteVentasComponent {

  private clienteService = inject(ClienteService);
  displayedColumns: string[] = ['idCliente', 'nombre', 'direccion', 'telefono', 'ultimaVenta', 'cantidadVendidos'];
  dataSource!: MatTableDataSource<ClienteCantidadProducto>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;



  constructor(@Inject(MAT_DIALOG_DATA) public data: number) {
    this.getClientes(data);
  }


  getClientes(idProducto: number) {
    this.clienteService.getClientesVentaProducto(idProducto).subscribe({
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

