import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AlineacionmoduloRoutingModule } from './alineacionmodulo-routing.module';
import { AlinearComponent } from './alinear/alinear.component';
import { ToastModule } from 'primeng/toast';


@NgModule({
  declarations: [
    AlinearComponent
  ],
  imports: [
    CommonModule,
    DragDropModule,
    AlineacionmoduloRoutingModule,
    ToastModule
  ]
})
export class AlineacionmoduloModule { }
