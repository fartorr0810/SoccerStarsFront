import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlinearComponent } from './alinear/alinear.component';

const routes: Routes = [
  {
    path:'',
    component:AlinearComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlineacionmoduloRoutingModule { }
