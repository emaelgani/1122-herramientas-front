import { Component, ViewChild, inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { VentaService } from '../../services/venta.service';
import { Venta, VentaProducto } from 'src/app/shared/interfaces/venta.interface';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogProductosVentaComponent } from '../../components/dialog-productos-venta/dialog-productos-venta.component';

@Component({
  selector: 'app-venta-page',
  templateUrl: './venta-page.component.html',
  styleUrls: ['./venta-page.component.css']
})
export class VentaPageComponent {

  displayedColumns: string[] = ['idVenta', 'cliente', 'fecha', 'totalVenta', 'action'];
  dataSource!: MatTableDataSource<Venta>;

  private _dialog = inject(MatDialog);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private ventaService = inject(VentaService);

  constructor() {
    this.getVentas();
  }

  getVentas() {
    this.ventaService.getVentas()
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

  openDialogProductosVendidos(idVenta: number){

    this.ventaService.getProductosPorVenta(idVenta)
    .subscribe({
      next: (res: VentaProducto[] ) => {
        this._dialog.open(DialogProductosVentaComponent, { data: res });
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  deleteVenta(idVenta: number){
    this.ventaService.deleteVenta(idVenta).subscribe({
      next: () => {
          this.getVentas();
      },
      error: (err) => {
        console.error(err);
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

