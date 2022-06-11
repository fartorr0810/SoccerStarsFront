import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearmensajecomunidadComponent } from './crearmensajecomunidad/crearmensajecomunidad.component';

const routes: Routes = [{
  path:'',
  component:CrearmensajecomunidadComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrearmensajecomunidadRoutingModule { }
