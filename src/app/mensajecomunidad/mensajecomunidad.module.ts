import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MensajecomunidadRoutingModule } from './mensajecomunidad-routing.module';
import { ListarmensajecomunidadComponent } from './listarmensajecomunidad/listarmensajecomunidad.component';
import { ToastModule } from 'primeng/toast';


@NgModule({
  declarations: [
    ListarmensajecomunidadComponent
  ],
  imports: [
    CommonModule,
    MensajecomunidadRoutingModule,
    ToastModule
  ]
})
export class MensajecomunidadModule { }
