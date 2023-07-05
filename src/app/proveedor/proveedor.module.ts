import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
// import { DialogPedidoChangeStatusComponent } from './components/dialog-pedido-change-status/dialog-pedido-change-status.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ProveedorPageComponent } from './pages/proveedor-page/proveedor-page.component';
import { ProveedorRoutingModule } from './proveedor-routing.module';
import { DialogProveedorComponent } from './components/dialog-proveedor/dialog-proveedor.component';

@NgModule({
  declarations: [
    LayoutPageComponent,
    ProveedorPageComponent,
    DialogProveedorComponent
    // DialogPedidoChangeStatusComponent


  ],
  imports: [
    CommonModule,
    MaterialModule,
    ProveedorRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class ProveedorModule { }
