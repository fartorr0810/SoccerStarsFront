import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CrearNotificacion, MensajeResponse, MensajeUser, Notificacion } from 'src/app/interfaces/interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
/**
 * Servicio de buzon de correo
 */
export class BuzonService {
  //Atributos
  private baseUrl: string = environment.baseURL;
  //Constructor
  constructor(private http:HttpClient) { }
/**
 * Método para obtener todos los mensajes del usuario conectado
 * @returns devuelve un observable con la lista de notificaciones
 */
  obtenerMensajes():Observable<Notificacion[]>{
    const url = `${this.baseUrl}notificacion?filtro=notificaciones`;
    const httpHeaders=new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    return this.http.get<Notificacion[]>(url,{ headers: httpHeaders});
  }
  /**
   * Método para enviar la respuesta a una notificacion
   * @param respuesta boolean true o false
   * @param idnotificacion id de la notificacion que se esta respondiendo
   * @returns devuelve un observable con la respuesta booleana
   */
  respuestaSolicitud(respuesta:boolean,idnotificacion:number):Observable<boolean>{
    const url = this.baseUrl+"notificacion/"+idnotificacion;
    const httpHeaders=new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    return this.http.put<boolean>(url,respuesta,{ headers: httpHeaders});
  }
  /**
   * Método para eliminar un mensaje
   * @param idnotificacion id el cual se va a borrar
   * @returns devuelve un observable booleano
   */
  eliminarMensaje(idnotificacion:number):Observable<boolean>{
    const url = this.baseUrl+"notificacion/"+idnotificacion;
    const httpHeaders=new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    return this.http.delete<boolean>(url,{ headers: httpHeaders});
  }
  /**
   * Método para cargar las noticias
   * @returns devuelve la lista de notificaciones
   */
  cargarNoticias(){
    const url = this.baseUrl+"notificacion/";
    const httpHeaders=new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    return this.http.get<Notificacion[]>(url,{ headers: httpHeaders});
  }
  /**
   * Método para que el administrador envie una notificacion a todos los usuarios
   * @param noticia objeto con los datos
   * @returns devuelve un observable de la notificacion
   */
  enviarMensajeComunidad(noticia:CrearNotificacion):Observable<Notificacion>{
    const url = this.baseUrl+"notificacion/";
    const httpHeaders=new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    return this.http.post<Notificacion>(url,noticia,{ headers: httpHeaders});
  }

  /**
   * Método para enviar un correo entre usuarios
   * @param mensajeUser
   * @returns
   */
  enviarMensajeUser(mensajeUser:MensajeUser):Observable<Notificacion>{
    const url = this.baseUrl+"notificacion/";
    const httpHeaders=new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    return this.http.post<Notificacion>(url,mensajeUser,{headers:httpHeaders});
  }


  /**
   * Obtiene todos los mensajes de un usuario
   * @param id
   * @returns
   */
  obtenerMensajesUser(id:number):Observable<MensajeResponse[]>{
    const url = this.baseUrl+`user/${id}/mensajes`;
    const httpHeaders=new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    return this.http.get<MensajeResponse[]>(url,{headers:httpHeaders});

  }


}
