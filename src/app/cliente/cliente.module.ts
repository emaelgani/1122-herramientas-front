import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientePageComponent } from './pages/cliente-page/cliente-page.component';
import { LayoutClientePageComponent } from './pages/layout-cliente-page/layout-cliente-page.component';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { ClienteRoutingModule } from './cliente-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogClienteComponent } from './components/dialog-cliente/dialog-cliente.component';
import { DialogNotaComponent } from './components/dialog-nota/dialog-nota.component';


@NgModule({
  declarations: [ClientePageComponent, LayoutClientePageComponent, DialogClienteComponent, DialogNotaComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ClienteRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class ClienteModule { }
