import { ProveedorService } from './../../../proveedor/services/proveedor.service';
import { Component, Inject, inject } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Producto } from 'src/app/shared/interfaces/producto.interface';
import { Proveedor } from 'src/app/shared/interfaces/proveedor.interface';
import { ValidatorsService } from 'src/app/shared/services/validators.service';

interface ProveedorSelect {
  idProveedor: number;
  nombreProveedor: string;
}

@Component({
  selector: 'app-dialog-producto',
  templateUrl: './dialog-producto.component.html',
  styleUrls: ['./dialog-producto.component.css']
})
export class DialogProductoComponent {

  private fb = inject(FormBuilder);
  public dialogRef = inject(MatDialogRef<DialogProductoComponent>);
  private _snackBar = inject(MatSnackBar);
  private productoService = inject(ProductoService);
  private proveedorService = inject(ProveedorService);
  private validatorsService = inject(ValidatorsService);

  public myForm: FormGroup = this.fb.group({
    idProveedor: ['', [Validators.required]],
    nombre: ['', [Validators.required]],
    codigo: ['', ],
    marca: ['', ],
    stock: ['', [Validators.required, Validators.min(0)]],
    precioLista: ['', [Validators.required, Validators.min(0)]],
    precioContado: ['', [Validators.required, Validators.min(0)]],
    precioFinanciado: ['', [Validators.required, Validators.min(0)]],
    descripcion: ['', ],
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: Producto) {
    this.getProveedores();
  }

  ngOnInit(): void {
    const data = {
      ...this.data,
    };
    this.myForm.patchValue(data);
  }

  proveedores: Proveedor[] = [];

  getProveedores() {
    this.proveedorService.getProveedores()
      .subscribe({
        next: (res) => {
          this.proveedores = res;
        },
        error: (err) => {
          console.error(err);
        }
      })
  }

  onSubmit(): void {
    if (this.myForm.valid) {

      if (this.data) {

        const transformedObj: Producto = {
          idProducto: this.data.idProducto,
          idProveedor: this.myForm.value.idProveedor,
          nombre: this.myForm.value.nombre,
          codigo: this.myForm.value.codigo,
          marca: this.myForm.value.marca,
          stock: this.myForm.value.stock,
          precioLista: this.myForm.value.precioLista,
          precioContado: this.myForm.value.precioContado,
          precioFinanciado: this.myForm.value.precioFinanciado,
          descripcion: this.myForm.value.descripcion,
        };
        this.productoService.updateProducto(transformedObj).subscribe({
          next: (val: any) => {
            this._snackBar.open('Producto actualizado correctamente', 'OK');
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          }
        })
      } else {
        const transformedObj: Producto = {
          //* Se agrega un nuevo cliente, por defecto la deuda es 0.
          idProveedor: this.myForm.value.idProveedor,
          nombre: this.myForm.value.nombre,
          codigo: this.myForm.value.codigo,
          marca: this.myForm.value.marca,
          stock: this.myForm.value.stock,
          precioLista: this.myForm.value.precioLista,
          precioContado: this.myForm.value.precioContado,
          precioFinanciado: this.myForm.value.precioFinanciado,
          descripcion: this.myForm.value.descripcion,
        };
        console.log(transformedObj);
        this.productoService.createProducto(transformedObj).subscribe({
          next: (val: any) => {
            this._snackBar.open('Producto creado correctamente', 'OK');
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          }
        })
      }
    }else{
      console.log('entra acca');
    }

  }

  isValiedField(field: string) {
    return this.validatorsService.isValidField(this.myForm, field);
  }


}
