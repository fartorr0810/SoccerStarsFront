import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
/**
 * App routing con las rutas que se van a usar.
 */
const routes: Routes = [
  {
    path:'',
    loadChildren:()=> import('./home/home.module').then(m=>m.HomeModule)
   },
   {
    path:'login',
    loadChildren:()=> import('./control-acceso/control-acceso.module').then(m=>m.ControlAccesoModule)
   },
   {
    path:'home',
    loadChildren:()=> import('./home/home.module').then(m=>m.HomeModule)
   },
   {
     path:'contacto',
     loadChildren:()=> import('./contacto/contacto.module').then(m=>m.ContactoModule)
   },
   {
     path:'buscarliga',
     loadChildren:()=> import('./liga/liga.module').then(m=>m.LigaModule),
     canActivate:[AuthGuard]

   },
   {
    path:'crearmensajecomunidad',
    loadChildren:()=> import('./crearmensajecomunidad/crearmensajecomunidad.module').then(m=>m.CrearmensajecomunidadModule),
    canActivate:[AuthGuard]
  },
  {
    path:'administrarfinanzas',
    loadChildren:()=> import('./administrarfinanzas/administrarfinanzas.module').then(m=>m.AdministrarfinanzasModule),
    canActivate:[AuthGuard]
  },
  {
    path:'buzon',
    loadChildren:()=> import('./buzon/buzon.module').then(m=>m.BuzonModule),
    canActivate:[AuthGuard]
  },
  {
    path:'mensajescomunidad',
    loadChildren:()=> import('./mensajecomunidad/mensajecomunidad.module').then(m=>m.MensajecomunidadModule),
    canActivate:[AuthGuard]
  },
  {
    path:'equipo',
    loadChildren:()=> import('./equipo/equipo.module').then(m=>m.EquipoModule),
    canActivate:[AuthGuard]
  },
  {
    path:'alinear',
    loadChildren:()=> import('./alineacionmodulo/alineacionmodulo.module').then(m=>m.AlineacionmoduloModule),
    canActivate:[AuthGuard]
  },
  {
    path:'jornada',
    loadChildren:()=> import('./jornada/jornada.module').then(m=>m.JornadaModule),
    canActivate:[AuthGuard]
  },
  {
    path:'clasificacion',
    loadChildren:()=> import('./clasificacion/clasificacion.module').then(m=>m.ClasificacionModule),
    canActivate:[AuthGuard]
  },
  {
    path:'mercado',
    loadChildren:()=> import('./mercado/mercado.module').then(m=>m.MercadoModule),
    canActivate:[AuthGuard]
  },
  {
    path:'usuario',
    loadChildren:()=> import('./usuario/usuario.module').then(m=>m.UsuarioModule),
    canActivate:[AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
