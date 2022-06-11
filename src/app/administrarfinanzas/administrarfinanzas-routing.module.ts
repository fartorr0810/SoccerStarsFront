import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministrarfinanzasComponent } from './administrarfinanzas/administrarfinanzas.component';

const routes: Routes = [
  {
    path:'',
    component:AdministrarfinanzasComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrarfinanzasRoutingModule { }
