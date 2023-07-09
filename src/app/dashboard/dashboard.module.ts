import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { MaterialModule } from '../material/material.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';
import { LayoutDashboardPageComponent } from './pages/layout-page/layout-page.component';
import { ChartBasicDeudaComponent } from './components/chart-basic-deuda/chart-basic-deuda.component';


import { ChartModule } from 'primeng/chart';
import { ChartLineIngresoComponent } from './components/chart-line-ingreso/chart-line-ingreso.component';
import { ChartBasicComprasComponent } from './components/chart-basic-compras/chart-basic-compras.component';
import { FormsModule } from '@angular/forms';
import { ChartProductosMasVendidosComponent } from './components/chart-productos-mas-vendidos/chart-productos-mas-vendidos.component';


@NgModule({
  declarations: [
    DashboardPageComponent,
    LayoutDashboardPageComponent,
    ChartBasicDeudaComponent,
    ChartLineIngresoComponent,
    ChartBasicComprasComponent,
    ChartProductosMasVendidosComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    DashboardRoutingModule,
    SharedModule,
    ChartModule,
    FormsModule
  ],
  providers: [DatePipe]
})
export class DashboardModule { }
