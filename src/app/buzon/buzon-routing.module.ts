import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuzonComponent } from './buzon/buzon.component';
import { MensajesComponent } from './mensajes/mensajes.component';

const routes: Routes = [
  {
    path:'',
    component:BuzonComponent
  },
  {
    path:'mensajes',
    component:MensajesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuzonRoutingModule { }
