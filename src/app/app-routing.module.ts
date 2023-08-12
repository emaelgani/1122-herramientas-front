import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { isNotAuthenticatedGuard } from './auth/guards/is-not-authenticated.guard';
import { isAuthenticatedGuard } from './auth/guards/is-authenticated.guard';

const routes: Routes = [
  {
    path: 'auth',
    canActivate: [isNotAuthenticatedGuard],
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule),
  },
  {
    path: 'dashboard',
    canActivate: [ isAuthenticatedGuard ],
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardModule),
  },
  {
    path: 'clientes',
    canActivate: [ isAuthenticatedGuard ],
    loadChildren: () => import('./cliente/cliente.module').then( m => m.ClienteModule)
  },
  {
    path: 'pedidos',
    canActivate: [ isAuthenticatedGuard ],
    loadChildren: () => import('./pedido/pedido.module').then( m => m.PedidoModule)
  },
  {
    path: 'productos',
    canActivate: [ isAuthenticatedGuard ],
    loadChildren: () => import('./producto/producto.module').then( m => m.ProductoModule)
  },
  {
    path: 'proveedores',
    canActivate: [ isAuthenticatedGuard ],
    loadChildren: () => import('./proveedor/proveedor.module').then( m => m.ProveedorModule)
  },
  {
    path: 'pagos',
    canActivate: [ isAuthenticatedGuard ],
    loadChildren: () => import('./pago/pago.module').then( m => m.PagoModule)
  },
  {
    path: 'ventas',
    canActivate: [ isAuthenticatedGuard ],
    loadChildren: () => import('./venta/venta.module').then( m => m.VentaModule)
  },
  {
    path: 'finanzas',
    canActivate: [ isAuthenticatedGuard ],
    loadChildren: () => import('./finanzas/finanzas.module').then( m => m.FinanzasModule)
  },
  {
    path: 'calendario',
    canActivate: [ isAuthenticatedGuard ],
    loadChildren: () => import('./calendar/calendar.module').then( m => m.CalendarModule)
  },
  // {
  //   /* Si es un path vacío va directo al dashboard. */
  //   path:'',
  //   redirectTo: 'dashboard',
  //   pathMatch: 'full'
  // },
  {
    path: '**',
    redirectTo: 'auth'
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
