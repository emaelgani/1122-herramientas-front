import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ProveedorPageComponent } from './pages/proveedor-page/proveedor-page.component';

const routes: Routes = [
  {
    path: '',
     component: LayoutPageComponent,
    children: [
      {
        path: '',
        component: ProveedorPageComponent
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
export class ProveedorRoutingModule { }
