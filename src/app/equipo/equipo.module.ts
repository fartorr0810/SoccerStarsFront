import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EquipoRoutingModule } from './equipo-routing.module';
import { EditarEquipoComponent } from './editar-equipo/editar-equipo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VerJugadoresComponent } from './ver-jugadores/ver-jugadores.component';
import { DataTablesModule } from 'angular-datatables';
import { VerpartidosComponent } from './verpartidos/verpartidos.component';
import { RouterModule } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';


@NgModule({
  declarations: [
    EditarEquipoComponent,
    VerJugadoresComponent,
    VerpartidosComponent
  ],
  imports: [
    CommonModule,
    EquipoRoutingModule,
    RouterModule,
    DataTablesModule,
    ReactiveFormsModule,
    ToastModule,
    TabViewModule,
    TableModule,
    ButtonModule
  ]
})
export class EquipoModule { }
