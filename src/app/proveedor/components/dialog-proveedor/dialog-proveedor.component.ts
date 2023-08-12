import { ProveedorService } from './../../services/proveedor.service';
import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Proveedor } from 'src/app/shared/interfaces/proveedor.interface';

@Component({
  selector: 'app-dialog-proveedor',
  templateUrl: './dialog-proveedor.component.html',
  styleUrls: ['./dialog-proveedor.component.css']
})
export class DialogProveedorComponent {

  private proveedorService = inject(ProveedorService);
  private fb = inject(FormBuilder);
  public dialogRef = inject(MatDialogRef<DialogProveedorComponent>);
  private _snackBar = inject(MatSnackBar);

  public myForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required]],
    telefono: ['', [Validators.required]],
    descripcion: ['', [Validators.required]],
    sumaGastoMensual: [false]
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: Proveedor) {
  }

  ngOnInit(): void {
    this.myForm.patchValue({...this.data});
  }



  onSubmit(): void {

    if (this.myForm.valid) {
      if (this.data) {

        const transformedObj: Proveedor = {
          idProveedor: this.data.idProveedor,
          nombre: this.myForm.value.nombre,
          telefono: this.myForm.value.telefono,
          descripcion: this.myForm.value.descripcion,
          sumaGastoMensual: this.myForm.value.sumaGastoMensual
        };

        this.proveedorService.updateProveedor(transformedObj).subscribe({
          next: (val: any) => {
            this._snackBar.open('Proveedor actualizado correctamente', 'OK');
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          }
        })
      }
      else {
        //* Si no hay data, es un proveedor nuevo.
        this.proveedorService.createProveedor(this.myForm.value).subscribe({
          next: (val: any) => {
            this._snackBar.open('Proveedor agregado correctamente', 'OK');
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          }
        })
      }
    }

  }
}
