import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutVentaPageComponent } from './pages/layout-venta-page/layout-venta-page.component';
import { VentaPageComponent } from './pages/venta-page/venta-page.component';

const routes: Routes = [
  {
    path: '',
     component: LayoutVentaPageComponent,
    children: [
      {
        path: '',
        component: VentaPageComponent
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
export class VentaRoutingModule { }
