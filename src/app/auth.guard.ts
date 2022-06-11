import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';

import Swal from 'sweetalert2';
import { ControlAccesoService } from './services/control-acceso.service';

@Injectable({
  providedIn: 'root'
})
/**
 * Guardian para comprobar que tiene rol y token
 */
export class AuthGuard implements CanActivate {
  //Constructor
  constructor(private serviciocontrol:ControlAccesoService, private router:Router){
  }
  /**
   * Metodo implantado por CanActivate
   * @param route ruta a la que se va
   * @param state estado
   * @returns devuelve un true o false en caso de que el token sea valido o no.
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree| any {
    return this.serviciocontrol.comprobarToken()
    .pipe(
        map( resp => {
          this.serviciocontrol.guardarRol(resp.rol);
          return true;
        }),
        catchError( err => {
            Swal.fire({
              title: 'Por favor',
              text: 'Inicia sesión',
              icon: 'error',
              confirmButtonText: 'Ok'
            })
            this.router.navigateByUrl('/login');
            return of(false)
        })
      )
  }
//Hacer guardian para las rutas, que compruebe el rol AuthRol, peticion para comprobar rol.
//Alerta de que si no tiene el rol, no pueda pasar.
}
