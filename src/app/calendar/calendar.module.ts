import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

import { CalendarRoutingModule } from './calendar-routing.module';
import { LayoutCalendarComponent } from './pages/layout-calendar/layout-calendar.component';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';
import { DialogCalendarComponent } from './components/dialog-calendar/dialog-calendar.component';
import { DialogOpcionesComponent } from './components/dialog-opciones/dialog-opciones.component';
import { DialogPagoComponent } from './components/dialog-pago/dialog-pago.component';


@NgModule({
  declarations: [
    LayoutCalendarComponent,
    CalendarComponent,
    DialogCalendarComponent,
    DialogOpcionesComponent,
    DialogPagoComponent
  ],
  imports: [
    CommonModule,
    CalendarRoutingModule,
    MaterialModule,
    SharedModule,
    FullCalendarModule,
    ReactiveFormsModule,
  ],
  providers: [CurrencyPipe]
})
export class CalendarModule { }
