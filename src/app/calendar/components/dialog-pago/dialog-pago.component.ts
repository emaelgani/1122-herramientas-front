import { Component, Inject, LOCALE_ID, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompromisoService } from '../../services/compromiso.service';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { CurrencyPipe } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Compromiso } from '../../interfaces/compromiso.interface';
import { PagoService } from '../../../pago/services/pago.service';

@Component({
  selector: 'app-dialog-pago',
  templateUrl: './dialog-pago.component.html',
  styleUrls: ['./dialog-pago.component.css']
})
export class DialogPagoComponent implements OnInit {

  public dialogRef = inject(MatDialogRef<DialogPagoComponent>);
  private _snackBar = inject(MatSnackBar);
  private currencyPipe = inject(CurrencyPipe);
  private _dialog = inject(MatDialog);

  private fb = inject(FormBuilder);
  private compromisoService = inject(CompromisoService);

  public myForm: FormGroup = this.fb.group({
    pagoEfectivo: [, []],
    pagoDigital: [, []],
    estado: ['', [Validators.required]],
  });


  constructor(@Inject(LOCALE_ID) private locale: string, @Inject(MAT_DIALOG_DATA) public data: Compromiso) {
  }


  ngOnInit(): void {
    const { pagoEfectivo, pagoDigital, estado } = this.data;
    const estadoValue = estado ? '1' : '2';
    this.myForm.patchValue({ pagoEfectivo, pagoDigital, estado: estadoValue });
  }

  onSubmit() {
    const total = Number(this.myForm.value.pagoEfectivo + this.myForm.value.pagoDigital);
    const suma = this.currencyPipe.transform(total, this.locale, '', '1.2-2')
    const efectivo = this.currencyPipe.transform(Number(this.myForm.value.pagoEfectivo), this.locale, '', '1.2-2')
    const digital = this.currencyPipe.transform(Number(this.myForm.value.pagoDigital), this.locale, '', '1.2-2')


    if (Number(total) != Number(this.data.monto)) {

      const dialogRef = this._dialog.open(ConfirmDialogComponent, {
        data: `La suma de los pagos es diferente al monto a pagar`
      });

    }
    else {
      const dialogRef = this._dialog.open(ConfirmDialogComponent, {
        data: `¿Registrar pago total de $${suma}, en efectivo de $${efectivo} y digital de $${digital}?` // Puedes personalizar el mensaje de confirmación

      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {

          this.data.estado = true;
          this.data.pagoDigital = this.myForm.value.pagoDigital == 0 ? undefined : this.myForm.value.pagoDigital;
          this.data.pagoEfectivo = this.myForm.value.pagoEfectivo == 0 ? undefined : this.myForm.value.pagoEfectivo;
          console.log(this.data);
          this.compromisoService.updateCompromiso(this.data).subscribe({
            next: (value: any) => {
              this._snackBar.open('Pago registrado', 'OK');
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
