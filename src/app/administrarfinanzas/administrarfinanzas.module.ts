import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrarfinanzasRoutingModule } from './administrarfinanzas-routing.module';
import { AdministrarfinanzasComponent } from './administrarfinanzas/administrarfinanzas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { ToastModule } from 'primeng/toast';


@NgModule({
  declarations: [
    AdministrarfinanzasComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    ToastModule,
    AdministrarfinanzasRoutingModule
  ]
})
export class AdministrarfinanzasModule { }
