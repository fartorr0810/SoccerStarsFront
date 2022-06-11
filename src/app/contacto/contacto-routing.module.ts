import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactoUbicacionComponent } from './contacto-ubicacion/contacto-ubicacion.component';

const routes: Routes = [
  {
    path:'',
    component:ContactoUbicacionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactoRoutingModule { }
