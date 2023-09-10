import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-description-producto',
  templateUrl: './dialog-description-producto.component.html',
  styleUrls: ['./dialog-description-producto.component.css']
})
export class DialogDescriptionProductoComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: string) {
  }
}
