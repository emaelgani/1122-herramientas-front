import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { VentaRoutingModule } from './venta-routing.module';
import { LayoutVentaPageComponent } from './pages/layout-venta-page/layout-venta-page.component';
import { VentaPageComponent } from './pages/venta-page/venta-page.component';
import { DialogProductosVentaComponent } from './components/dialog-productos-venta/dialog-productos-venta.component';

@NgModule({
  declarations: [
    LayoutVentaPageComponent,
    VentaPageComponent,
    DialogProductosVentaComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    VentaRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class VentaModule { }
