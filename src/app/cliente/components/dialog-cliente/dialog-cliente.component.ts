import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../../shared/interfaces/cliente.interface';


@Component({
  selector: 'app-dialog-cliente',
  templateUrl: './dialog-cliente.component.html',
  styleUrls: ['./dialog-cliente.component.css']
})
export class DialogClienteComponent implements OnInit {

  private clienteService = inject(ClienteService);
  private fb = inject(FormBuilder);
  public dialogRef = inject(MatDialogRef<DialogClienteComponent>);
  private _snackBar = inject(MatSnackBar);

  public myForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required]],
    telefono: ['', [Validators.required]],
    direccion: ['', [Validators.required]],
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    const data = {
      ...this.data,
    };
    this.myForm.patchValue(data);
  }




  onSubmit(): void {

    if (this.myForm.valid) {


      if (this.data) {

        const transformedObj: Cliente = {
          idCliente: this.data.idCliente,
          nombre: this.myForm.value.nombre,
          telefono: this.myForm.value.telefono,
          direccion: this.myForm.value.direccion,
          //! TODO: revisar deuda que sea siempre lo que viene de la data.
          deuda: this.myForm.value.deuda,
        };
        this.clienteService.updateCliente(transformedObj).subscribe({
          next: (val: any) => {
            this._snackBar.open('Cliente actualizado correctamente', 'OK');
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          }
        })
      } else {
        const transformedObj: Cliente = {
          //* Se agrega un nuevo cliente, por defecto la deuda es 0.
          nombre: this.myForm.value.nombre,
          telefono: this.myForm.value.telefono,
          direccion: this.myForm.value.direccion,
          deuda: 0
        };
        this.clienteService.createCliente(transformedObj).subscribe({
          next: (val: any) => {
            this._snackBar.open('Cliente agregado correctamente', 'OK');
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
