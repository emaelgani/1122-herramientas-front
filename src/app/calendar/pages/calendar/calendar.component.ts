import { Component, signal, ChangeDetectorRef, OnInit, inject, LOCALE_ID, Inject, OnDestroy } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi, EventInput } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import esLocale from '@fullcalendar/core/locales/es';
import { MatDialog } from '@angular/material/dialog';
import { DialogCalendarComponent } from '../../components/dialog-calendar/dialog-calendar.component';
import { Compromiso } from '../../interfaces/compromiso.interface';
import { CompromisoService } from '../../services/compromiso.service';
import { CurrencyPipe } from '@angular/common';
import { DialogOpcionesComponent } from '../../components/dialog-opciones/dialog-opciones.component';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  private currencyPipe = inject(CurrencyPipe);
  private compromisoService = inject(CompromisoService);
  private _dialog = inject(MatDialog);
  calendarVisible = signal(false);
  public eventos = signal<EventInput[]>([]);

  calendarOptions = signal<CalendarOptions>({
    plugins: [
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin,
      listPlugin,
    ],
    locale: esLocale,
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      // right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
      right: 'dayGridMonth'
    },
    initialView: 'dayGridMonth',
    initialEvents: this.eventos(), // alternatively, use the `events` setting to fetch from a feed
    weekends: true,
    // editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    /* you can update a remote database when these fire:
    eventRemove: this.handleRemove.bind(this)
    eventChange:
    eventAdd:
    */
  });
  currentEvents = signal<EventApi[]>([]);

  constructor(private changeDetector: ChangeDetectorRef, @Inject(LOCALE_ID) private locale: string) {

  }

  ngOnInit(): void {
    this.getCompromisos();
  }

  //Devuelve true si existe.
  checkIdExists(arr: Compromiso[], id: number): boolean {
    return arr.some(item => item.idCompromiso === id);
  }

  getCompromisos() {

    this.compromisoService.getCompromisos().subscribe({
      next: (res: any) => {
        // Iterar sobre cada elemento de la respuesta y construir el objeto eventInput
        for (const compromiso of res) {
          const eventInput: EventInput = {
            id: compromiso.idCompromiso.toString(),
            title: `${compromiso.estado ? 'Pagado' : 'No pagado'} $${this.currencyPipe.transform(compromiso.monto, this.locale, '', '1.2-2')}`,
            start: compromiso.fecha,
          };
          this.eventos.mutate(values => {
            // Verificar si el ID ya existe en el arreglo
            const existingEventIndex = values.findIndex(value => value.id === eventInput.id);
            // Si existe, actualizar los valores del evento en el arreglo
            if (existingEventIndex !== -1) {
              values[existingEventIndex] = eventInput;
            }
            else {
              values.push(eventInput);
            }

            return values;
          });
        }

        this.eventos.mutate( values => {

          values.forEach( (value, index) => {
            if(!this.checkIdExists(res, Number(value.id))){
              values.splice(index, 1);
            }
          })

          return;
        })

        setTimeout(() => {
          this.handleCalendarToggle();
        }, 500);
      },
      error: (err: any) => {
        console.log(err); // Rechazar la promesa en caso de error
      }
    });
  }

  handleCalendarToggle() {

    if (!this.calendarVisible()) {
      this.calendarVisible.update((bool) => !bool);
    } else {
      this.calendarVisible.set(false);
      setTimeout(() => {
        this.calendarVisible.set(true);
      }, 500);
    }

  }

  handleWeekendsToggle() {
    this.calendarOptions.mutate((options) => {
      options.weekends = !options.weekends;
    });
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    //!* Abrir ventana dialog
    const data: Compromiso = {
      fecha: selectInfo.startStr
    }
    const dialogRef = this._dialog.open(DialogCalendarComponent, { data });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getCompromisos();
        }
      }
    });
  }


  async handleEventClick(clickInfo: EventClickArg) {
    let dataParameter;

    try {
      const res = await this.compromisoService.getCompromiso(Number(clickInfo.event.id)).toPromise();
      dataParameter = res;
    } catch (err) {
      console.log(err);
    }

    const dialogRef = this._dialog.open(DialogOpcionesComponent, {data: dataParameter});

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.getCompromisos();
      }
    });

  }

  handleEvents(events: EventApi[]) {
    this.currentEvents.set(events);
    this.changeDetector.detectChanges(); // workaround for pressionChangedAfterItHasBeenCheckedError
  }
}
