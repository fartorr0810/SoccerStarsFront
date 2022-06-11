import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlinearComponent } from '../alineacionmodulo/alinear/alinear.component';
import { EditarEquipoComponent } from './editar-equipo/editar-equipo.component';
import { VerJugadoresComponent } from './ver-jugadores/ver-jugadores.component';
import { VerpartidosComponent } from './verpartidos/verpartidos.component';

const routes: Routes = [
  {
    path:'',
    component:EditarEquipoComponent
  },
  {
    path:'ver-jugadores',
    component:VerJugadoresComponent
  },
  {
    path:'verpartidos',
    component:VerpartidosComponent
  },
  {
    path:'alinear',
    component:AlinearComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EquipoRoutingModule { }
