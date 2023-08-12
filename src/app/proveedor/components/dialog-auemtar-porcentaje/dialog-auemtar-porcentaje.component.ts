import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProveedorService } from '../../services/proveedor.service';
import { Proveedor, ProveedorAumento } from 'src/app/shared/interfaces/proveedor.interface';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-dialog-auemtar-porcentaje',
  templateUrl: './dialog-auemtar-porcentaje.component.html',
  styleUrls: ['./dialog-auemtar-porcentaje.component.css']
})
export class DialogAuemtarPorcentajeComponent {


  private proveedorService = inject(ProveedorService);
  private fb = inject(FormBuilder);
  public dialogRef = inject(MatDialogRef<DialogAuemtarPorcentajeComponent>);
  private _snackBar = inject(MatSnackBar);
  private _dialog = inject(MatDialog);

  public myForm: FormGroup = this.fb.group({
    porcentaje: [ , [Validators.required]],
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: number) {
  }


  onSubmit(): void {

    if (this.myForm.valid) {
      if (this.data) {

        const transformedObj: ProveedorAumento = {
          idProveedor: this.data,
          porcentaje: this.myForm.value.porcentaje,
        };

        const dialogRef = this._dialog.open(ConfirmDialogComponent, {
          data: `¿Estás seguro de aumentar ${transformedObj.porcentaje}% este proveedor?` // Puedes personalizar el mensaje de confirmación
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.proveedorService.aumentarPorcentajeProveedor(transformedObj).subscribe({
              next: (val: any) => {
                console.log('entra aca');
                this._snackBar.open('Porcentaje actualizado correctamente', 'OK');
                this.dialogRef.close(true);
              },
              error: (err) => {
                console.error(err);
              }
            });
          }
        });

      }

    }

  }
}
