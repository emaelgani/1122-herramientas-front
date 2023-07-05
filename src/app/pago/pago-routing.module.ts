import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPagoPageComponent } from './pages/layout-pago-page/layout-pago-page.component';
import { PagoPageComponent } from './pages/pago-page/pago-page.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPagoPageComponent,
    children: [
      {
        path: '',
        component: PagoPageComponent
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
export class PagoRoutingModule { }
