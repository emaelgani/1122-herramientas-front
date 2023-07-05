import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutProductoPageComponent } from './pages/layout-producto-page/layout-producto-page.component';
import { ProductoPageComponent } from './pages/producto-page/producto-page.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutProductoPageComponent,
    children: [
      {
        path: '',
        component: ProductoPageComponent
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
export class ProductoRoutingModule { }
