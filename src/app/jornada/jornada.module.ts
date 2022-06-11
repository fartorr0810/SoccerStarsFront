import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TabViewModule} from 'primeng/tabview';
import { JornadaRoutingModule } from './jornada-routing.module';
import { JornadasComponent } from './jornadas/jornadas.component';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';


@NgModule({
  declarations: [
    JornadasComponent
  ],
  imports: [
    CommonModule,
    JornadaRoutingModule,
    ToastModule,
    TabViewModule,
    TableModule,
    ButtonModule
  ]
})
export class JornadaModule { }
