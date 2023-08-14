import { Component, OnInit, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ClienteService } from 'src/app/cliente/services/cliente.service';
import { ProductoService } from 'src/app/producto/services/producto.service';
import { PagoService } from '../../../pago/services/pago.service';
import { forkJoin } from 'rxjs';
import { CompromisoService } from 'src/app/calendar/services/compromiso.service';
import { VentaService } from 'src/app/venta/services/venta.service';
import { CobranzaYVenta } from 'src/app/shared/interfaces/venta.interface';


interface Transaction {
  item: string;
  cost: number;
}

@Component({
  selector: 'app-finanzas-page',
  templateUrl: './finanzas-page.component.html',
  styleUrls: ['./finanzas-page.component.css'],


})
export class FinanzasPageComponent implements OnInit {

  private ventaService = inject(VentaService);
  private productoService = inject(ProductoService);
  private clienteService = inject(ClienteService);
  private pagoService = inject(PagoService);
  private compromisosService = inject(CompromisoService);
  private datePipe = inject(DatePipe);
  private startDate!: string;
  private endDate!: string;
  private startDateGastos!: string;
  private endDateGastos!: string;
  public cobranzas: string = '';
  public ventas: string = '';
  public gastos: string = '';
  public montoCompromisoNoPagado: string = '';

  displayedColumns: string[] = ['item', 'cost'];

  transactions: Transaction[] = [
    { item: 'Valor Stock Lista', cost: 0 },
    { item: 'Saldo', cost: 0 },
    { item: 'Liquidez', cost: 0 },
    { item: 'Compromisos no abonados', cost: 0 },
  ];

  transactions2: Transaction[] = [
    { item: 'Valor Stock Financiado', cost: 0 },
    { item: 'Saldo', cost: 0 },
    { item: 'Liquidez', cost: 0 },
    { item: 'Compromisos no abonados', cost: 0 },
  ]


  transactions3: Transaction[] = [
    { item: 'Liquidez Digital', cost: 0 },
    { item: 'Liquidez Efectivo', cost: 0 },
  ]



  constructor() { }

  ngOnInit() {
    forkJoin({
      stockLista: this.getTotalCostoStockLista(),
      stockFinanciado: this.getTotalCostoStockFinanciado(),
      deuda: this.getTotalDeuda(),
      liquidezEfectivo: this.getLiquidezEfectivo(),
      liquidezDigital: this.getLiquidezDigital(),
      totalMontoCompromisosEfectivo: this.getMontoCompromisoEfectivo(),
      totalMontoCompromisosDigital: this.getMontoCompromisoDigital(),
      totalCompromisosNoPagados: this.getCompromisoMontoNoAbonado()
    }).subscribe(({ stockLista, stockFinanciado,  deuda, liquidezEfectivo, liquidezDigital, totalMontoCompromisosDigital, totalMontoCompromisosEfectivo, totalCompromisosNoPagados }) => {

      this.transactions[0].cost = stockLista;
      this.transactions[1].cost = deuda;
      this.transactions[2].cost = liquidezEfectivo + liquidezDigital - totalMontoCompromisosDigital - totalMontoCompromisosEfectivo;
      this.transactions[3].cost = totalCompromisosNoPagados;

      this.transactions2[0].cost = stockFinanciado;
      this.transactions2[1].cost = deuda;
      this.transactions2[2].cost = liquidezEfectivo + liquidezDigital - totalMontoCompromisosDigital - totalMontoCompromisosEfectivo;
      this.transactions2[3].cost = totalCompromisosNoPagados;

      this.transactions3[0].cost = liquidezDigital - totalMontoCompromisosDigital;
      this.transactions3[1].cost = liquidezEfectivo - totalMontoCompromisosEfectivo;

    })
  }

  getMontoCompromisoEfectivo() {
    return this.compromisosService.getTotalMontoCompromisosEfectivo();
  }

  getMontoCompromisoDigital() {
    return this.compromisosService.getTotalMontoCompromisosDigital();
  }

  getTotalCostoStockLista() {
    return this.productoService.getTotalValorStock();
  }

  getTotalDeuda() {
    return this.clienteService.getTotalDeuda();
  }

  getLiquidezDigital() {
    return this.pagoService.getLiquidezDigital();
  }

  getLiquidezEfectivo() {
    return this.pagoService.getLiquidezEfectivo();
  }

  getTotalCostoStockFinanciado() {
    return this.productoService.getTotalValorStockFinanciado();
  }

  getCompromisoMontoNoAbonado(){
    return this.compromisosService.MontoTotalCompromisosNoPagados();
  }

  getCobranzasYVentas(fechaInicio: string, fechaFin: string) {

    this.ventaService.getCobranzasYVentas(fechaInicio, fechaFin)

      .subscribe({
        next: (res: CobranzaYVenta) => {
          this.cobranzas = res.totalCobranzas.toString();
          this.ventas =  res.totalVentas.toString();
        },
      })
  }




  getGastos(fechaInicio: string, fechaFin: string){
    this.compromisosService.getGastos(fechaInicio, fechaFin)

      .subscribe({
        next: (res: number) => {
          this.gastos = res.toString();
        }
      })
  }

  getTotalCost(transactions: Transaction[]): number {
    return transactions.reduce((acc, transaction) => {
      // Verificar si el item es igual a 'Compromisos no abonados'
      if (transaction.item === 'Compromisos no abonados') {
        // Restar el costo cuando el item es igual a 'Compromisos no abonados'
        return acc - transaction.cost;
      } else {
        // Sumar el costo en otros casos
        return acc + transaction.cost;
      }
    }, 0);
  }

  onStartDateChange(event: any) {
    const formattedEndDate = this.datePipe.transform(event.value, 'dd/MM/yyyy');
    this.startDate = formattedEndDate!;
  }

  onEndDateChange(event: any) {
    const formattedEndDate = this.datePipe.transform(event.value, 'dd/MM/yyyy');
    this.endDate = formattedEndDate!;

    if (this.startDate != null && this.endDate != null) {
      this.getCobranzasYVentas(this.startDate, this.endDate);
    }
  }

  onStartDateChangeGastos(event: any) {
    const formattedEndDate = this.datePipe.transform(event.value, 'dd/MM/yyyy');
    this.startDateGastos = formattedEndDate!;
  }

  onEndDateChangeGastos(event: any) {
    const formattedEndDate = this.datePipe.transform(event.value, 'dd/MM/yyyy');
    this.endDateGastos = formattedEndDate!;

    if (this.startDateGastos != null && this.endDateGastos != null) {
      this.getGastos(this.startDateGastos, this.endDateGastos);
    }
  }
}
