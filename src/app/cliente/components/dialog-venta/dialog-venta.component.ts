import { Component, Inject, LOCALE_ID, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { map } from 'rxjs';
import { ProductoService } from 'src/app/producto/services/producto.service';
import { ProveedorService } from 'src/app/proveedor/services/proveedor.service';
import { Producto } from 'src/app/shared/interfaces/producto.interface';
import { Proveedor } from 'src/app/shared/interfaces/proveedor.interface';
import { VentaCompleta } from 'src/app/shared/interfaces/venta.interface';
import { Venta, VentaProducto } from '../../../shared/interfaces/venta.interface';
import { VentaService } from 'src/app/venta/services/venta.service';
import { DialogClienteComponent } from '../dialog-cliente/dialog-cliente.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { CurrencyPipe } from '@angular/common';

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
  selector: 'app-dialog-venta',
  templateUrl: './dialog-venta.component.html',
  styleUrls: ['./dialog-venta.component.css']
})
export class DialogVentaComponent {

  productos: ProductoGroup[] = [
  ];

  public dialogRef = inject(MatDialogRef<DialogClienteComponent>);
  private _snackBar = inject(MatSnackBar);
  private fb = inject(FormBuilder);
  private proveedorService = inject(ProveedorService);
  private productoService = inject(ProductoService);
  private ventaService = inject(VentaService);
  private currencyPipe = inject(CurrencyPipe);
  private _dialog = inject(MatDialog);


  constructor(@Inject(MAT_DIALOG_DATA) public data: any, @Inject(LOCALE_ID) private locale: string) {
    this.getProductosPorProveedor();
  }


  myForm: FormGroup = this.fb.group({
    fecha: ['', [Validators.required]],
    productos: this.fb.array([])
  });


  get productosArray(): FormArray {
    return this.myForm.get('productos') as FormArray;
  }

  agregarProducto(): void {

    const productoFormGroup = this.fb.group({
      idProducto: ['', [Validators.required]],
      idTipoPrecio: ['1', [Validators.required]],
      cantidad: ['', [Validators.required, Validators.min(1)]],
      esPrecioEspecial: [false],
      precioUnidad: ['', [Validators.required, Validators.min(1)]]
    });

    this.productosArray.push(productoFormGroup);
  }

  deleteProducto(index: number) {
    this.productosArray.removeAt(index);
  }


  onLabelSelected(event: any, i: number) {

    const idProducto = this.productosArray.at(i).value.idProducto

    if (!idProducto) {
      //TODO: Si producto es null, no seguir. Crear cartel de error.
      console.log('Producto null');
    }
    else {
      this.productoService.getProducto(idProducto)
        .subscribe({

          next: (res: Producto) => {
            const label = 'precioUnidad';
            const patchValueObj: Record<string, any> = {};
            patchValueObj[label] = event.value == 1 ? res.precioContado : res.precioFinanciado;
            this.productosArray.at(i).patchValue(patchValueObj);

            // Aplicar formato de moneda con dos decimales al campo "precioUnidad"
            const precioUnidadValue = this.productosArray.at(i).get('precioUnidad')?.value;
            const precioUnidadFormatted = this.currencyPipe.transform(precioUnidadValue, this.locale, '', '1.2-2');
            const precioUnidadFormattedNumeric = precioUnidadFormatted!.replace(/[^0-9.,]/g, '');
            this.productosArray.at(i).get('precioUnidad')?.setValue(precioUnidadFormattedNumeric);
          },
          error: (err) => {
            console.error(err);
          }
        })
    }

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

  onSubmit() {

    if (this.myForm.valid) {

      if (this.myForm.value.productos.length == 0) {
        this._snackBar.open('Debe agregar por lo menos 1 producto a la venta', 'ERROR');
      }
      else {

        const ventaObj: Venta = {
          idCliente: this.data.idCliente,
          fecha: this.myForm.value.fecha

        }
        let totalVenta: number = 0;

        const ventaProductos: VentaProducto[] = [];

        // Recorre el arreglo de productos y crea objetos VentaProducto
        this.myForm.value.productos.forEach((producto: any) => {

          const precioUnidadNumber = parseFloat(producto.precioUnidad.replace('.', '').replace(',', '.'));
          const ventaProducto: VentaProducto = {
            idProducto: producto.idProducto,
            idTipoPrecio: producto.idTipoPrecio,
            cantidad: producto.cantidad,
            esPrecioEspecial: producto.esPrecioEspecial,
            precioUnidad: precioUnidadNumber,
            total: producto.cantidad * precioUnidadNumber
          };
          totalVenta += ventaProducto.total;
          ventaProductos.push(ventaProducto);
        });

        ventaObj.totalVenta = totalVenta;

        const finalObj: VentaCompleta = {
          venta: ventaObj,
          productos: ventaProductos
        };


        const dialogRef = this._dialog.open(ConfirmDialogComponent, {
          data: '¿Estás seguro de guardar la venta?' // Puedes personalizar el mensaje de confirmación
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.ventaService.createVenta(finalObj)
              .subscribe({
                next: (res) => {
                  this._snackBar.open('Venta agregada correctamente', 'OK');
                  this.dialogRef.close(true);
                },
                error: (err) => {
                  this._snackBar.open(err.error, 'ERROR');
                  console.error(err);
                }
              })
          }
        });
      }
    }



  }



}
