import { Component, Inject, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClienteService } from '../../services/cliente.service';


@Component({
  selector: 'app-dialog-nota',
  templateUrl: './dialog-nota.component.html',
  styleUrls: ['./dialog-nota.component.css']
})
export class DialogNotaComponent implements OnInit {

  private clienteService = inject(ClienteService);
  private fb = inject(FormBuilder);
  public dialogRef = inject(MatDialogRef<DialogNotaComponent>);
  private _snackBar = inject(MatSnackBar);

  public nombreCliente = signal('');

  public myForm: FormGroup = this.fb.group({
    fecha: ['', []],
    descripcion: ['', []],
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

        const fecha = new Date(this.myForm.value.fecha);
        const fechaTransformada = fecha.toISOString().split('T')[0];

        const transformedObj: any = {
          //* Se agrega una nueva nota
          idCliente: this.data.idCliente,
          descripcion: this.myForm.value.descripcion,
          fecha: fechaTransformada,
          estado: false
        };



        this.clienteService.createNota(transformedObj).subscribe({
          next: (val: any) => {
            this._snackBar.open('Nota agregada correctamente', 'OK');
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          }
        })
      } else {
        this._snackBar.open('Error al crear nota', 'OK');
      }
    }

  }
}
