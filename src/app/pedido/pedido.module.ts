import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { PedidoPageComponent } from './pages/pedido-page/pedido-page.component';
import { PedidoRoutingModule } from './pedido-routing.module';
import { DialogPedidoChangeStatusComponent } from './components/dialog-pedido-change-status/dialog-pedido-change-status.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PedidoPageComponent,
    LayoutPageComponent,
    DialogPedidoChangeStatusComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    PedidoRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class PedidoModule { }
