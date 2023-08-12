import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutFinanzasPageComponent } from './pages/layout-finanzas-page/layout-finanzas-page.component';
import { FinanzasPageComponent } from './pages/finanzas-page/finanzas-page.component';
import { FinanzasRoutingModule } from './finanzas-routing.module';


@NgModule({
  declarations: [
    LayoutFinanzasPageComponent,
    FinanzasPageComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FinanzasRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [DatePipe,

  ]
})
export class FinanzasModule { }
