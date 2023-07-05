import { Component, ViewChild, inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProveedorService } from '../../services/proveedor.service';
import { Proveedor } from 'src/app/shared/interfaces/proveedor.interface';
import { DialogProveedorComponent } from '../../components/dialog-proveedor/dialog-proveedor.component';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-proveedor-page',
  templateUrl: './proveedor-page.component.html',
  styleUrls: ['./proveedor-page.component.css']
})
export class ProveedorPageComponent {


  displayedColumns: string[] = ['idProveedor', 'nombre', 'telefono', 'descripcion', 'action'];
  dataSource!: MatTableDataSource<Proveedor>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private proveedorService = inject(ProveedorService);
  private _dialog = inject(MatDialog);
  private _snackBar = inject(MatSnackBar);

  constructor() {
    this.getProveedores();
  }


  getProveedores() {
    this.proveedorService.getProveedores()
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

  openDialogNewProveedor(){
  const dialogRef = this._dialog.open(DialogProveedorComponent);
      dialogRef.afterClosed().subscribe({
        next: (val) => {
          if (val) {
            this.getProveedores();
          }
        }
      });
  }

  openEditDialogProveedor(data: any) {
    const dialogRef = this._dialog.open(DialogProveedorComponent, { data });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getProveedores();
        }
      }
    });
  }



  deleteProveedor
  (idProveedor: number) {
    const dialogRef = this._dialog.open(ConfirmDialogComponent, {
      data: '¿Estás seguro de que deseas eliminar este proveedor?' // Puedes personalizar el mensaje de confirmación
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.proveedorService.deleteProveedor(idProveedor).subscribe({
          next: () => {
            this._snackBar.open('Proveedor eliminado', 'OK');
            this.getProveedores();
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

