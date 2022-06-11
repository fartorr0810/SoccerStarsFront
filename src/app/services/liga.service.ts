import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {  Liga, LigaDTO, OperacionPresupuesto, Solicitud, UsuarioResponse } from 'src/app/interfaces/interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
/**
 * Servicio de la liga
 */
export class LigaService {
  //Atributos
  private baseUrl: string = environment.baseURL;
  //Constructor
  constructor(private http:HttpClient) { }
/**
 * Método para obtener todas las ligas
 * @returns Devuelve un observable con la lista de todas las ligas disponibles.
 */
  obtenerLigas():Observable<any>{
    const url = `${this.baseUrl}liga`;
    const httpHeaders=new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    return this.http.get<any>(url,{ headers: httpHeaders});
  }


  /**
   * Método para crear una liga
   * @param liga datos del formulario de creación de liga
   * @returns observable con la liga que se ha creado
   */
  crearLiga(liga:Liga):Observable<LigaDTO>{
    const url = `${this.baseUrl}liga`;
    const httpHeaders=new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    return this.http.post<LigaDTO>(url,liga,{ headers: httpHeaders});
  }
  /**
   * Metodo para iniciar la liga
   * @param liga liga que se va a iniciar
   * @returns observable de la liga.
   */
  iniciarLiga(liga:LigaDTO):Observable<LigaDTO>{
    const url = `${this.baseUrl}liga`;
    const httpHeaders=new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    return this.http.put<LigaDTO>(url,liga,{ headers: httpHeaders});
  }

  /**
   * Método para enviar solicitud / notificación de unión al adminitrador de una liga seleccionada
   * @param liganombre liga seleccionada en la tabla de ligas disponibles
   * @returns observable con el estado de la notificación
   */
  enviarSolicitud(liganombre:string):Observable<boolean>{
    const url = `${this.baseUrl}notificacion/`;
    let bodypeticion:Solicitud={
      tipo: 'unir',
      mensaje: liganombre
    }
    const httpHeaders=new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    return this.http.post<boolean>(url,bodypeticion,{ headers: httpHeaders});
  }
  /**
   * Metodo para editar el presupuesto de un equipo
   * @param idequipo del equipo al que se va editar el presupuesto
   * @param operacion la operacion que se va a realizar
   * @returns true o false si se hace o no
   */
  editarPresupuestoEquipo(idequipo:string,operacion:OperacionPresupuesto){
    const url= this.baseUrl+"equipo/"+idequipo+"/presupuesto"
    let operacionueva={
      cantidad: operacion.cantidad,
      tipo:operacion.tipoo
    }
    console.log(idequipo);
    console.log(operacionueva);
    const httpHeaders=new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    return this.http.put<boolean>(url,operacionueva,{ headers: httpHeaders});
  }

  /**
   * Obtiene todos los usuarios pertenecientes a una liga
   * @param idLiga
   * @returns
   */
  obtenerUsuariosLiga(idLiga:number):Observable<UsuarioResponse[]>{
    const url = `${this.baseUrl}liga/${idLiga}/users`;
    const httpHeaders=new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    return this.http.get<UsuarioResponse[]>(url,{headers:httpHeaders});

  }

}
