import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent {


    public sidebarItems = [
      { label: 'Dashboard', icon: 'bar_chart', url:'/dashboard'},
      { label: 'Proveedores', icon: 'supervisor_account', url:'/clientes'},
      { label: 'Productos', icon: 'construction', url:'/clientes'},
      { label: 'Clientes', icon: 'groups', url:'/clientes'},
      { label: 'Ventas', icon: 'sell', url:'/clientes'},
      { label: 'Pagos', icon: 'payments', url:'/clientes'},
      { label: 'Pedidos', icon: 'description', url:'/clientes'},
    ];
}
