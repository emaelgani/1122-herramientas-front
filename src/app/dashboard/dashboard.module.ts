import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { MaterialModule } from '../material/material.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';
import { LayoutDashboardPageComponent } from './pages/layout-page/layout-page.component';

@NgModule({
  declarations: [
    DashboardPageComponent,
    LayoutDashboardPageComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    DashboardRoutingModule,
    SharedModule,

  ]
})
export class DashboardModule { }
