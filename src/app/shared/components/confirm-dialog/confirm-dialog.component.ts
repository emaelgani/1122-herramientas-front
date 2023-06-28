import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']

})
export class ConfirmDialogComponent {

  public dialogRef = inject(MatDialogRef<ConfirmDialogComponent>);

  constructor(
    @Inject(MAT_DIALOG_DATA) public message: string
  ) {}

  onConfirm(): void {
    this.dialogRef.close(true); // Devuelve 'true' al componente padre cuando se confirma la acción
  }

  onCancel(): void {
    this.dialogRef.close(false); // Devuelve 'false' al componente padre cuando se cancela la acción
  }
}
