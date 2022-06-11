import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministrarLigaComponent } from './administrar-liga/administrar-liga.component';
import { BuscarLigaComponent } from './buscar-liga/buscar-liga.component';
import { CrearLigaComponent } from './crear-liga/crear-liga.component';
/**
 * Rutas del modulo de las ligas
 */
const routes: Routes = [
  {
    path:'',
    component:BuscarLigaComponent
  },
  {
    path:'administrar-liga',
    component:AdministrarLigaComponent
  },
  {
    path:'crear-liga',
    component:CrearLigaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LigaRoutingModule { }
