import { Component, OnInit, ViewChild, inject, signal } from '@angular/core';
import { PedidoService } from 'src/app/pedido/services/pedido.service';
import { Pedido } from '../../interfaces/pedido.interface';
import { MatDrawer } from '@angular/material/sidenav';
import { CompromisoService } from 'src/app/calendar/services/compromiso.service';
import { catchError, forkJoin, map, of } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  @ViewChild('drawer') drawer!: MatDrawer;
  private pedidoService = inject(PedidoService);
  private compromisoService = inject(CompromisoService);
  private authService = inject(AuthService);


  public sidebarItems = [
    { label: 'Dashboard', icon: 'bar_chart', url: '/dashboard' },
    { label: 'Clientes', icon: 'groups', url: '/clientes' },
    { label: 'Proveedores', icon: 'supervisor_account', url: '/proveedores' },
    { label: 'Productos', icon: 'construction', url: '/productos' },
    { label: 'Ventas', icon: 'sell', url: '/ventas' },
    { label: 'Pagos', icon: 'payments', url: '/pagos' },
    { label: 'Pedidos', icon: 'description', url: '/pedidos', matBadge: 0 },
    { label: 'Finanzas', icon: 'query_stats', url: '/finanzas' },
    { label: 'Calendar', icon: 'calendar_month', url: '/calendario', matBadge: 0 },
  ];

  ngOnInit(): void {
    this.setLabel();
  }

  setLabel(){
    forkJoin({
      pedidosSinRevisar: this.pedidosSinRevisar(),
      compromisosHoy: this.compromisosHoy()
    }).subscribe(({ pedidosSinRevisar, compromisosHoy }) => {
      this.sidebarItems[6].matBadge  = pedidosSinRevisar ;
      this.sidebarItems[8].matBadge = compromisosHoy;
    });
  }

  compromisosHoy() {
    return this.compromisoService.getCompromisosNoSaldadosHoy();
  }

  pedidosSinRevisar() {
    return this.pedidoService.getPedidos().pipe(
      map((res: Pedido[]) => {
        return res.filter((item: any) => item.estado === false).length;
      }),
      catchError((err: any) => {
        console.log(err);
        return of(0);
      })
    );
  }

  toggleDrawer(): void {
    this.drawer.toggle();
    this.setLabel();
  }


  onLogout(): void {
    this.authService.logout();
  }
}
