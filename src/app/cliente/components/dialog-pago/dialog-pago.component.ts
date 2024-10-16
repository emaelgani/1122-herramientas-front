import { Component, Inject, inject, LOCALE_ID, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClienteService } from '../../services/cliente.service';
import { Pago } from 'src/app/shared/interfaces/pago.interface';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { PagoService } from 'src/app/pago/services/pago.service';
import { ValidatorsService } from 'src/app/shared/services/validators.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-dialog-pago',
  templateUrl: './dialog-pago.component.html',
  styleUrls: ['./dialog-pago.component.css']
})
export class DialogPagoComponent {

  private pagoService = inject(PagoService);
  private validatorsService = inject(ValidatorsService);
  private fb = inject(FormBuilder);
  public dialogRef = inject(MatDialogRef<DialogPagoComponent>);
  private _snackBar = inject(MatSnackBar);
  private _dialog = inject(MatDialog);
  private currencyPipe = inject(CurrencyPipe);

  public myForm: FormGroup = this.fb.group({
    metodoPago: ['1', [Validators.required]],
    pago: ['', [Validators.required, Validators.min(0)]],
    fecha: ['', [Validators.required]]
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, @Inject(LOCALE_ID) private locale: string) {
  }


  onSubmit(): void {

    if (this.myForm.valid) {


      if (this.data.idCliente) {

        const transformedObj: Pago = {
          idCliente: this.data.idCliente,
          idMetodoPago: this.myForm.value.metodoPago,
          totalPago: this.myForm.value.pago,
          fecha: this.myForm.value.fecha
        };

        const dialogRef = this._dialog.open(ConfirmDialogComponent, {
          //data: `¿Estás seguro de registrar un pago de ${transformedObj.totalPago} ?` // Puedes personalizar el mensaje de confirmación
          data: `¿Estás seguro de registrar un pago de $${this.currencyPipe.transform(transformedObj.totalPago, this.locale, '', '1.2-2')} ?` // Puedes personalizar el mensaje de confirmación

        });

        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.pagoService.createPago(transformedObj).subscribe({
              next: () => {
                this._snackBar.open('Pago registrado', 'OK');
                this.dialogRef.close(true);
              },
              error: (err) => {
                console.error(err);
              }
            });
          }
        });


      } else {

      }
    }

  }

  isValiedField(field: string) {
    return this.validatorsService.isValidField(this.myForm, field);
  }

}
