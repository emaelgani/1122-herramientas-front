import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LayoutProductoPageComponent } from './pages/layout-producto-page/layout-producto-page.component';
import { ProductoPageComponent } from './pages/producto-page/producto-page.component';
import { ProductoRoutingModule } from './producto-routing.module';
import { DialogProductoComponent } from './components/dialog-producto/dialog-producto.component';
import { DialogClienteVentasComponent } from './components/dialog-cliente-ventas/dialog-cliente-ventas.component';

@NgModule({
  declarations: [
    LayoutProductoPageComponent,
    ProductoPageComponent,
    DialogProductoComponent,
    DialogClienteVentasComponent,
    /* DialogPedidoChangeStatusComponent */
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ProductoRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class ProductoModule { }
