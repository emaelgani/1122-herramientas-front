import { Component, ViewChild, inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../../shared/interfaces/cliente.interface';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogClienteComponent } from '../../components/dialog-cliente/dialog-cliente.component';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { DialogNotaComponent } from '../../components/dialog-nota/dialog-nota.component';
import { DialogVentaComponent } from '../../components/dialog-venta/dialog-venta.component';


@Component({
  selector: 'app-cliente-page',
  templateUrl: './cliente-page.component.html',
  styleUrls: ['./cliente-page.component.css']
})
export class ClientePageComponent {

  displayedColumns: string[] = ['idCliente', 'nombre', 'direccion', 'telefono', 'deuda', 'action'];
  dataSource!: MatTableDataSource<Cliente>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private clienteService = inject(ClienteService);
  private _dialog = inject(MatDialog);
  private _snackBar = inject(MatSnackBar);

  constructor() {
    this.getClientees();
  }



  getClientees() {
    this.clienteService.getClientes().subscribe({
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


  openDialogCliente(){
    const dialogRef = this._dialog.open(DialogClienteComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getClientees();
        }
      }
    });
  }

  openDialogVenta(data: any){
    const dialogRef = this._dialog.open(DialogVentaComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getClientees();
        }
      }
    });
  }

  openDialogNota(data: any){

    const dialogRef = this._dialog.open(DialogNotaComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getClientees();
        }
      }
    });
  }


  openEditDialogCliente(data: any){
    const dialogRef = this._dialog.open(DialogClienteComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getClientees();
        }
      }
    });
  }

  deleteCliente(idCliente: number) {
    const dialogRef = this._dialog.open(ConfirmDialogComponent, {
      data: '¿Estás seguro de que deseas eliminar este cliente?' // Puedes personalizar el mensaje de confirmación
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.clienteService.deleteCliente(idCliente).subscribe({
          next: () => {
            this._snackBar.open('Cliente eliminado', 'OK');
            this.getClientees();
          },
          error: (err) => {
            console.error(err);
          }
        });
      }
    });
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

