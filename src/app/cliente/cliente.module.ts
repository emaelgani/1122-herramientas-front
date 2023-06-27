import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientePageComponent } from './pages/cliente-page/cliente-page.component';
import { LayoutClientePageComponent } from './pages/layout-cliente-page/layout-cliente-page.component';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { ClienteRoutingModule } from './cliente-routing.module';



@NgModule({
  declarations: [ClientePageComponent, LayoutClientePageComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ClienteRoutingModule,
    SharedModule,
  ]
})
export class ClienteModule { }
