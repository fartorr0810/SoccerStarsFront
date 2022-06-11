import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactoRoutingModule } from './contacto-routing.module';
import { ContactoUbicacionComponent } from './contacto-ubicacion/contacto-ubicacion.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';


@NgModule({
  declarations: [
    ContactoUbicacionComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ContactoRoutingModule,
    ToastModule
  ]
})
export class ContactoModule { }
