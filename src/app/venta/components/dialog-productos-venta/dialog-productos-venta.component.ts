import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { VentaProducto } from 'src/app/shared/interfaces/venta.interface';
interface Transaction {
  item: string;
  cost: number;
}

@Component({
  selector: 'app-dialog-productos-venta',
  templateUrl: './dialog-productos-venta.component.html',
  styleUrls: ['./dialog-productos-venta.component.css']
})
export class DialogProductosVentaComponent {


  displayedColumns: string[] = ['producto', 'proveedor', 'descripcion', 'tipoPrecio', 'esPrecioEspecial', 'precioUnidad', 'cantidad', 'total'  ];
  dataSource!: MatTableDataSource<VentaProducto>;


  constructor(@Inject(MAT_DIALOG_DATA) public data: VentaProducto[]) {
    this.dataSource = new MatTableDataSource(data);
  }


  getTotalCost() {
     return this.data.map(t => t.total).reduce((acc, value) => acc + value, 0);
  }

}
