import { Component, ViewChild, inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Pedido } from 'src/app/shared/interfaces/pedido.interface';
import { PedidoService } from '../../services/pedido.service';
import { map } from 'rxjs';
import { DialogPedidoChangeStatusComponent } from '../../components/dialog-pedido-change-status/dialog-pedido-change-status.component';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-pedido-page',
  templateUrl: './pedido-page.component.html',
  styleUrls: ['./pedido-page.component.css']
})
export class PedidoPageComponent {

  displayedColumns: string[] = ['idPedido', 'nombreCliente', 'fecha', 'estado', 'descripcion', 'action'];
  dataSource!: MatTableDataSource<Pedido>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private pedidoService = inject(PedidoService);
  private _dialog = inject(MatDialog);
  private _snackBar = inject(MatSnackBar);

  constructor() {
    this.getPedidos();
  }


  getPedidos() {
    this.pedidoService.getPedidos().pipe(
      map(res => {
        res.forEach(pedido => {
          pedido.nombreCliente = pedido.cliente.nombre;
        })
        return res.sort((a, b) => {
          // Ordenar por estado ascendente (false primero, true después)
          if (a.estado && !b.estado) {
            return 1;
          } else if (!a.estado && b.estado) {
            return -1;
          } else {
            return 0;
          }
        });
      })
    )
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


  openEditDialogPedido(data: any) {
    const dialogRef = this._dialog.open(DialogPedidoChangeStatusComponent, { data });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getPedidos();
        }
      }
    });
  }



  deletePedido(idPedido: number) {
    const dialogRef = this._dialog.open(ConfirmDialogComponent, {
      data: '¿Estás seguro de que deseas eliminar este pedido?' // Puedes personalizar el mensaje de confirmación
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.pedidoService.deletePedido(idPedido).subscribe({
          next: () => {
            this._snackBar.open('Pedido eliminado', 'OK');
            this.getPedidos();
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

