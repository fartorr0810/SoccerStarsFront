import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LigaRoutingModule } from './liga-routing.module';
import { BuscarLigaComponent } from './buscar-liga/buscar-liga.component';
import { AdministrarLigaComponent } from './administrar-liga/administrar-liga.component';
import { DataTablesModule } from 'angular-datatables';
import { CrearLigaComponent } from './crear-liga/crear-liga.component';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';


@NgModule({
  declarations: [
    BuscarLigaComponent,
    AdministrarLigaComponent,
    CrearLigaComponent
  ],
  imports: [
    CommonModule,
    LigaRoutingModule,
    DataTablesModule,
    FormsModule,
    ToastModule
  ]
})
export class LigaModule { }
