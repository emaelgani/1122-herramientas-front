import { ClientePageComponent } from './pages/cliente-page/cliente-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutClientePageComponent } from './pages/layout-cliente-page/layout-cliente-page.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutClientePageComponent,
    children: [
      {
        path: '',
        component: ClientePageComponent
      },
      {
        path: '**',
        redirectTo: ''
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }
