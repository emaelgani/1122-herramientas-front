import { Component, inject } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { CompromisoService } from 'src/app/calendar/services/compromiso.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent {
  private breakpointObserver = inject(BreakpointObserver);
  private compromisoService = inject(CompromisoService);
  private _snackBar = inject(MatSnackBar);

  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Clientes con más deuda acumulada', cols: 1, rows: 1 },
          { title: 'Balance entre pagos y ventas', cols: 1, rows: 1 },
          { title: 'Producto vendido por mes', cols: 2, rows: 1 },
          // { title: 'Cantidad ventas y productos por cliente', cols: 1, rows: 1 },
          { title: 'Productos más comprados por clientes', cols: 2, rows: 1 },
        ];
      }

      return [
        { title: 'Clientes con más deuda acumulada', cols: 1, rows: 1 },
        { title: 'Balance entre pagos y ventas', cols: 1, rows: 1 },
        { title: 'Producto vendido por mes', cols: 2, rows: 1 },
        // { title: 'Cantidad ventas y productos por cliente', cols: 1, rows: 1 },
        { title: 'Productos más comprados por clientes', cols: 2, rows: 1 },
      ];
    })
  );

  constructor() {
    this.getCantidadCompromisosHoy();
  }

  getCantidadCompromisosHoy(){
    this.compromisoService.getCompromisosNoSaldadosHoy().subscribe({
      next: (value) => {
        if(value>0){
          this._snackBar.open(`La cantidad de compromisos para saldar el día de hoy es de: ${value}`, 'OK');
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }


}
