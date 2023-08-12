import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutFinanzasPageComponent } from './pages/layout-finanzas-page/layout-finanzas-page.component';
import { FinanzasPageComponent } from './pages/finanzas-page/finanzas-page.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutFinanzasPageComponent,
    children: [
      {
        path: '',
        component: FinanzasPageComponent
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
export class FinanzasRoutingModule { }
