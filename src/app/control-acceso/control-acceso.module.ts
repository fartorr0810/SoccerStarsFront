import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ControlAccesoRoutingModule } from './control-acceso-routing.module';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';


@NgModule({
  declarations: [
    LoginComponent,
    RegistroComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ControlAccesoRoutingModule,
    ToastModule
  ]
})
export class ControlAccesoModule { }
