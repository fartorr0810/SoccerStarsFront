import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Alineacion, Equipo, EquipoDTO } from 'src/app/interfaces/interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EquipoService {

  private baseUrl: string = environment.baseURL;
  constructor(private http:HttpClient) { }


  /**
   * Método que edita un equipo apartir de los datos del formulario crear equipo
   * @param equipo datos del equipo a editar recogidos en el formulario
   * @param id del equipo a editar
   * @param fichero imagen del equipo
   * @returns Observable con el equipo que se ha editado
   */
  editarEquipo(equipo:EquipoDTO, id:number, fichero:FormData):Observable<Equipo>{
    const url = `${this.baseUrl}equipo/${id}`;
    const headers=new HttpHeaders()
    .set('Authorization',`Bearer ${localStorage.getItem('token')}`)
    const params = new  HttpParams()
    .set("nombreEquipo",equipo.nombre)
    return this.http.put<Equipo>(url,fichero,{headers:headers,params});
  }
  /**
   * Metodo para alinear , recibiendo la alineacion, la jornada y el partido a la que sera
   * @param alieacion alineacion de los jugadores que jugaran el partido
   * @param idjornada id de la jornada
   * @param idpartido id del partido
   * @returns devuelve observable con un bolean si es correcto
   */
  alinearEquipo(alieacion:Alineacion, idjornada:number,idpartido:number):Observable<boolean>{
    const url = this.baseUrl+"jornada/"+idjornada+"/partido/"+idpartido;
    const headers=new HttpHeaders()
    .set('Authorization',`Bearer ${localStorage.getItem('token')}`)
    return this.http.put<boolean>(url,alieacion,{headers:headers});
  }

  /**
   * Método que obtiene el equipo de un usuario
   * @returns Observable con equipo del usuario que se encuentra logueado
   */
  obtenerEquipo():Observable<Equipo>{
    const url = `${this.baseUrl}equipo`;
    const httpHeaders=new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    return this.http.get<Equipo>(url,{headers:httpHeaders});
  }
  /**
   * Metodo para eliminar un equipo de la liga
   * @param id del equipo a borrar
   */
  borrarEquipo(id: number) {
    const url = `${this.baseUrl}equipo/${id}`;
    const httpHeaders=new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    return this.http.delete(url,{headers:httpHeaders});
  }
  /**
   * Metodo para obtener la clasificacion de los equipos.
   * @returns
   */
  obtenerClasificacion():Observable<Equipo[]>{
    const url = `${this.baseUrl}liga/clasificacion/`;
    const httpHeaders=new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    return this.http.get<Equipo[]>(url,{headers:httpHeaders});
  }

}
