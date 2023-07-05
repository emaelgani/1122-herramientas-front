import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { PagoRoutingModule } from './pago-routing.module';
import { PagoPageComponent } from './pages/pago-page/pago-page.component';
import { LayoutPagoPageComponent } from './pages/layout-pago-page/layout-pago-page.component';

@NgModule({
  declarations: [
    PagoPageComponent,
    LayoutPagoPageComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    PagoRoutingModule,
    SharedModule,

  ]
})
export class PagoModule { }
