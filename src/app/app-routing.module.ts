import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductoModule } from './producto/producto.module';

const routes: Routes = [
  // {
  //   path: 'auth',
  //   loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule),
  // },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardModule),
  },
  {
    path: 'clientes',
    loadChildren: () => import('./cliente/cliente.module').then( m => m.ClienteModule)
  },
  {
    path: 'pedidos',
    loadChildren: () => import('./pedido/pedido.module').then( m => m.PedidoModule)
  },
  {
    path: 'productos',
    loadChildren: () => import('./producto/producto.module').then( m => m.ProductoModule)
  },
  {
    path: 'proveedores',
    loadChildren: () => import('./proveedor/proveedor.module').then( m => m.ProveedorModule)
  },
  {
    path: 'pagos',
    loadChildren: () => import('./pago/pago.module').then( m => m.PagoModule)
  },
  {
    path: 'ventas',
    loadChildren: () => import('./venta/venta.module').then( m => m.VentaModule)
  },
  {
    /* Si es un path vacío va directo al dashboard. */
    path:'',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  },
  //Todo: Crear pagina 404 si no machea.


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
