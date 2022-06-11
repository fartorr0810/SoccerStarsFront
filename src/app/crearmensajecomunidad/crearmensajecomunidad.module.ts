import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CrearmensajecomunidadRoutingModule } from './crearmensajecomunidad-routing.module';
import { CrearmensajecomunidadComponent } from './crearmensajecomunidad/crearmensajecomunidad.component';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';


@NgModule({
  declarations: [
    CrearmensajecomunidadComponent
  ],
  imports: [
    CommonModule,
    CrearmensajecomunidadRoutingModule,
    FormsModule,
    ToastModule
  ],
  exports: [
    CrearmensajecomunidadComponent
  ]
})
export class CrearmensajecomunidadModule { }
