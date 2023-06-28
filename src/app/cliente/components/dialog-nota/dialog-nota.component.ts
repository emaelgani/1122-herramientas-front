import { Component, Inject, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-dialog-nota',
  templateUrl: './dialog-nota.component.html',
  styleUrls: ['./dialog-nota.component.css']
})
export class DialogNotaComponent implements OnInit {

  // private clienteService = inject(ClienteService);
  private fb = inject(FormBuilder);
  public dialogRef = inject(MatDialogRef<DialogNotaComponent>);
  private _snackBar = inject(MatSnackBar);

  public nombreCliente = signal('');

  public myForm: FormGroup = this.fb.group({
    idCliente: ['', []],
    fecha: ['', []],
    observacion: ['', []],
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    const data = {
      ...this.data,
    };
    this.nombreCliente.set(data.nombre);
    this.myForm.patchValue(data);
  }




  onSubmit(): void {

    if (this.myForm.valid) {


      if (this.data) {
        console.log(this.data);

        const transformedObj: any = {
          //* Se agrega una nueva nota
          idCliente: this.data.idCliente,
          observacion: this.myForm.value.nombre,
          fecha: this.myForm.value.telefono,
        };

        // this.clienteService.createCliente(transformedObj).subscribe({
        //   next: (val: any) => {
        //     this._snackBar.open('Nota agregada correctamente', 'OK');
        //     this.dialogRef.close(true);
        //   },
        //   error: (err: any) => {
        //     console.error(err);
        //   }
        // })
      } else {

      }
    }

  }
}
