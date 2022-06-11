import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuzonRoutingModule } from './buzon-routing.module';
import { BuzonComponent } from './buzon/buzon.component';
import { DataTablesModule } from 'angular-datatables';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { PickListModule } from 'primeng/picklist';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { FieldsetModule } from 'primeng/fieldset';
import { PanelModule } from 'primeng/panel';
import { MenuModule } from 'primeng/menu';
import {MultiSelectModule} from 'primeng/multiselect';
import { ReactiveFormsModule } from '@angular/forms';
import { MensajesComponent } from './mensajes/mensajes.component';


@NgModule({
  declarations: [
    BuzonComponent,
    MensajesComponent
  ],
  imports: [
    CommonModule,
    DataTablesModule,
    BuzonRoutingModule,
    ReactiveFormsModule,
    ConfirmDialogModule,
    DialogModule,
    TableModule,
    ToolbarModule,
    PaginatorModule,
    CardModule,
    InputTextModule,
    ToastModule,
    ButtonModule,
    PickListModule,
    PanelModule,
    MenuModule,
    FieldsetModule,
    ToastModule,
    MultiSelectModule
  ],
  exports: [
    BuzonComponent
  ]
})
export class BuzonModule { }
