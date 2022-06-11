import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MercadoRoutingModule } from './mercado-routing.module';
import { JugadoresComponent } from './jugadores/jugadores.component';
import { DataTablesModule } from 'angular-datatables';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';


@NgModule({
  declarations: [
    JugadoresComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    MercadoRoutingModule,
    ToastModule
  ]
})
export class MercadoModule { }
