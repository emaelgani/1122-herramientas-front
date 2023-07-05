import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PedidoService } from '../../services/pedido.service';
import { Pedido } from 'src/app/shared/interfaces/pedido.interface';

@Component({
  selector: 'app-dialog-pedido-change-status',
  templateUrl: './dialog-pedido-change-status.component.html',
  styleUrls: ['./dialog-pedido-change-status.component.css']
})
export class DialogPedidoChangeStatusComponent {

  private pedidoService = inject(PedidoService);
  private fb = inject(FormBuilder);
  public dialogRef = inject(MatDialogRef<DialogPedidoChangeStatusComponent>);
  private _snackBar = inject(MatSnackBar);

  public myForm: FormGroup = this.fb.group({
    estado: ['', []],
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: Pedido) {
  }

  ngOnInit(): void {
    const data = {
      ...this.data,
      estado: this.data.estado.toString()
    };
    this.myForm.patchValue(data);
  }



  onSubmit(): void {

    if (this.myForm.valid) {
      if (this.data) {
        this.pedidoService.changeStatus(this.data.idPedido).subscribe({
          next: (val: any) => {
            this._snackBar.open('Cambio de estado correctamente', 'OK');
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
