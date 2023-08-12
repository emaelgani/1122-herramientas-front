import { Component, Inject, LOCALE_ID, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProveedorService } from 'src/app/proveedor/services/proveedor.service';
import { Compromiso } from '../../interfaces/compromiso.interface';
import { Proveedor } from 'src/app/shared/interfaces/proveedor.interface';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { CurrencyPipe } from '@angular/common';
import { CompromisoService } from '../../services/compromiso.service';

@Component({
  selector: 'app-dialog-calendar',
  templateUrl: './dialog-calendar.component.html',
  styleUrls: ['./dialog-calendar.component.css']
})
export class DialogCalendarComponent implements OnInit {

  private fb = inject(FormBuilder);
  public dialogRef = inject(MatDialogRef<DialogCalendarComponent>);
  private _snackBar = inject(MatSnackBar);
  private proveedorService = inject(ProveedorService);
  private currencyPipe = inject(CurrencyPipe);
  private _dialog = inject(MatDialog);
  private compromisoService = inject(CompromisoService);

  public myForm: FormGroup = this.fb.group({
    idProveedor: ['', [Validators.required]],
    monto: [{value:'', disabled: this.data.estado}, [Validators.required]],
    });

  constructor(@Inject(MAT_DIALOG_DATA) public data: Compromiso, @Inject(LOCALE_ID) private locale: string) {
    this.getProveedores();
  }

  ngOnInit(): void {
    const {idProveedor, monto, estado} = this.data;
    const estadoValue = estado ? '1' : '2';
    this.myForm.patchValue({idProveedor, monto, estado: estadoValue});
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

      if(this.data.idCompromiso){
        const transformedObj: Compromiso = {
          idCompromiso: this.data.idCompromiso,
          idProveedor: this.myForm.value.idProveedor,
          monto: this.myForm.value.monto,
          estado: this.myForm.value.estado== '1' ? true : false,
          fecha: this.data.fecha,
        };
        const dialogRef = this._dialog.open(ConfirmDialogComponent, {
          data: `¿Estás seguro de actualizar el compromiso?`
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.compromisoService.updateCompromiso(transformedObj).subscribe({
              next: (value: any) => {
                this._snackBar.open('Compromiso actualizado correctamente', 'OK');
                this.dialogRef.close(true);
              },
              error: (err: any) => {
                console.log(err);
              }
            })
          }
        });
      }
      else {

        const transformedObj: Compromiso = {
          idProveedor: this.myForm.value.idProveedor,
          monto: this.myForm.value.monto,
          estado: this.myForm.value.estado== '1' ? true : false,
          fecha: this.data.fecha,
        };

        const dialogRef = this._dialog.open(ConfirmDialogComponent, {
          //data: `¿Estás seguro de registrar un pago de ${transformedObj.totalPago} ?` // Puedes personalizar el mensaje de confirmación
          data: `¿Estás seguro de registrar un compromiso de $${this.currencyPipe.transform(transformedObj.monto, this.locale, '', '1.2-2')} ?` // Puedes personalizar el mensaje de confirmación

        });

        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.compromisoService.createCompromiso(transformedObj).subscribe({
              next: (value: any) => {
                this._snackBar.open('Compromiso registrado', 'OK');
                this.dialogRef.close(true);
              },
              error: (err: any) => {
                console.log(err);
              }
            })
          }
        });
      }

    }

  }



}
