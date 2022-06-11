import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { catchError, map, Observable, of } from 'rxjs';
import { UsuarioRegister } from 'src/app/interfaces/interface';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
/**
 * Clase para valdiar el email haciendo llamada a la API implementando el AsyncValidator
 */
export class NicknameValidatorService implements AsyncValidator{

  private url:string=environment.baseURL;

  constructor(private httpClient: HttpClient) {

  }
  /**
   * Metodo implicito de AsyncValidator que recibe el nickname, mandamos la patecion
   * y nos suscribimos, segun l oque nos responde indicamos true o false
   * @param nickname
   * @returns
   */
  validate(nickname: AbstractControl): Observable<ValidationErrors | null> {
    let nombredeusuario = nickname.value;
    return this.comprobarNickname(nombredeusuario).pipe(
      map (resp => {
        if(resp.nombreusuario != null){
           return {nicknameenuso: true};
        }else{
         return null;
        }
      }),
      catchError (err => {
         return of(null);
      })
    );
   }
/**
 * Peticion a la API para comprobar el email
 * @param nickname nickname a comprobar
 * @returns devuelve true o false
 */
  comprobarNickname(nickname:string){
    const url = this.url+"user/"+nickname+"?filtro=nombreusuario";
    const httpHeaders=new HttpHeaders()
    httpHeaders.append('Access-Control-Allow-Origin','*');
    return this.httpClient.get<UsuarioRegister>(url,{headers :httpHeaders});
  }

}

