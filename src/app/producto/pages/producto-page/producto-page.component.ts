import { Component, ViewChild, inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Cliente } from '../../../shared/interfaces/cliente.interface';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
//import { DialogClienteComponent } from '../../components/dialog-cliente/dialog-cliente.component';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
//import { DialogNotaComponent } from '../../components/dialog-nota/dialog-nota.component';
import { ProductoService } from './../../services/producto.service';
import { Producto } from 'src/app/shared/interfaces/producto.interface';
import { map } from 'rxjs';
import { DialogProductoComponent } from '../../components/dialog-producto/dialog-producto.component';
import { DialogClienteVentasComponent } from '../../components/dialog-cliente-ventas/dialog-cliente-ventas.component';

@Component({
  selector: 'app-producto-page',
  templateUrl: './producto-page.component.html',
  styleUrls: ['./producto-page.component.css']
})
export class ProductoPageComponent {




    displayedColumns: string[] = ['idProducto', 'nombreProveedor', 'nombre', 'marca', 'codigo',  'stock', 'precioLista' , 'precioFinanciado', 'precioContado', 'descripcion', 'cantidadVentas','action'];
    dataSource!: MatTableDataSource<Producto>;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    private productoService = inject(ProductoService);
    private _dialog = inject(MatDialog);
    private _snackBar = inject(MatSnackBar);

    constructor() {
      this.getProductos();

    }


    getProductos() {
      this.productoService.getProductos().pipe(
      map( res => {
        return res.sort((a, b) => a.nombreProveedor!.localeCompare(b.nombreProveedor!));
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


    openNewDialogProducto(){
      const dialogRef = this._dialog.open(DialogProductoComponent);
      dialogRef.afterClosed().subscribe({
        next: (val) => {
          if (val) {
            this.getProductos();
          }
        }
      });
    }



    openEditDialogProducto(data: any){
      const dialogRef = this._dialog.open(DialogProductoComponent, {
        data,
      });
      dialogRef.afterClosed().subscribe({
        next: (val) => {
          if (val) {
            this.getProductos();
          }
        }
      });
    }

    deleteProducto(idProducto: number) {
      const dialogRef = this._dialog.open(ConfirmDialogComponent, {
        data: '¿Estás seguro de que deseas eliminar este producto?' // Puedes personalizar el mensaje de confirmación
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.productoService.deleteProducto(idProducto).subscribe({
            next: () => {
              this._snackBar.open('Producto eliminado', 'OK');
              this.getProductos();
            },
            error: (err) => {
              console.error(err);
            }
          });
        }
      });
    }

    opendDialogClientesMasVentas(idProducto: number){
      const dialogRef = this._dialog.open(DialogClienteVentasComponent, {data: idProducto});
      dialogRef.afterClosed().subscribe({
        next: (val) => {
          if (val) {
            this.getProductos();
          }
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

