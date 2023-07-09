import { Component, inject } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent {
  private breakpointObserver = inject(BreakpointObserver);

  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Clientes con más deuda acumulada', cols: 1, rows: 1 },
          { title: 'Ingreso por mes', cols: 1, rows: 1 },
          { title: 'Cantidad ventas y productos por cliente', cols: 1, rows: 1 },
          { title: 'Productos más comprados por clientes', cols: 1, rows: 1 }
        ];
      }

      return [
        { title: 'Clientes con más deuda acumulada', cols: 1, rows: 1 },
        { title: 'Ingreso por mes', cols: 1, rows: 1 },
        { title: 'Cantidad ventas y productos por cliente', cols: 1, rows: 1 },
        { title: 'Productos más comprados por clientes', cols: 1, rows: 1 }
      ];
    })
  );
}
