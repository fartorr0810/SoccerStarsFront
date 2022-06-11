import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarmensajecomunidadComponent } from './listarmensajecomunidad/listarmensajecomunidad.component';

const routes: Routes = [{
    path:'',
    component:ListarmensajecomunidadComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MensajecomunidadRoutingModule { }
