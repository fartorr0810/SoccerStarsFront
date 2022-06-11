import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Jornada } from 'src/app/interfaces/interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JornadaService {
  private baseUrl: string = environment.baseURL;

  constructor(private http:HttpClient) { }

  /**
   * Metodo para obtener las jornadas
   * @returns devuelve un observable de la lista con las jornadas
   */
  obtenerJornadas():Observable<Jornada[]>{
    const url = `${this.baseUrl}jornada`;
    const httpHeaders=new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    return this.http.get<Jornada[]>(url,{headers:httpHeaders});
  }

  jugarJornada(id:number):Observable<Jornada>{
    const url = `${this.baseUrl}jornada/${id}`;
    const httpHeaders=new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    const objeto ={
      id:''
    }
    return this.http.put<Jornada>(url,objeto,{headers:httpHeaders});
  }
}
