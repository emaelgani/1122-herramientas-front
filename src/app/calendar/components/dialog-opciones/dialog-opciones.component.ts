import { Component, Inject, inject } from '@angular/core';
import { Compromiso } from '../../interfaces/compromiso.interface';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CompromisoService } from '../../services/compromiso.service';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogCalendarComponent } from '../dialog-calendar/dialog-calendar.component';
import { DialogPagoComponent } from '../dialog-pago/dialog-pago.component';

@Component({
  selector: 'app-dialog-opciones',
  templateUrl: './dialog-opciones.component.html',
  styleUrls: ['./dialog-opciones.component.css']
})
export class DialogOpcionesComponent {

  private compromisoService = inject(CompromisoService);
  private _dialog = inject(MatDialog);
  private _snackBar = inject(MatSnackBar);
  public dialogRef = inject(MatDialogRef<DialogOpcionesComponent>);

  constructor(@Inject(MAT_DIALOG_DATA) public data: Compromiso) {
  }


  onDeleteCompromiso(){
    if(this.data.idCompromiso){
      const dialogRef = this._dialog.open(ConfirmDialogComponent, {
        data: `¿Estás seguro de eliminar el compromiso?`
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.compromisoService.deleteCompromiso(this.data.idCompromiso!).subscribe({
            next: (value: any) => {
              this._snackBar.open('Compromiso eliminado correctamente', 'OK');
              this.dialogRef.close(true);
            },
            error: (err: any) => {
              console.warn(err);
            }
          })
        }
      });
    }
    else{
      console.warn('Para eliminar el compromiso debe proporcionar el idCompromiso');
    }
  }

  onUpdateCompromiso(){
    const dialogRef = this._dialog.open(DialogCalendarComponent, { data: this.data });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if(val){
          this._snackBar.open('Compromiso actualizado correctamente', 'OK');
          this.dialogRef.close(true);
        }
      }
    });
  }

  onPagoCompromiso(){
    const dialogRef = this._dialog.open(DialogPagoComponent, { data: this.data });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if(val){
          this._snackBar.open('Pago agregado correctamente', 'OK');
          this.dialogRef.close(true);
        }
      }
    });
  }
}
