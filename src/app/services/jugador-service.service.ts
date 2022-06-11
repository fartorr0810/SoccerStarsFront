import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Equipo, Jugador, Oferta } from 'src/app/interfaces/interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JugadorServiceService {
  private baseUrl: string = environment.baseURL;

  constructor(private http:HttpClient) { }

  /**
   * Método que obtiene los jugadores pertenecientes a un equipo
   * @returns devuelve observable con el equipo y sus respectivos jugadores
   */
  obtenerJugadoresEquipo():Observable<Equipo>{
    const url = `${this.baseUrl}equipo`;
    const httpHeaders=new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    return this.http.get<Equipo>(url,{headers:httpHeaders});
  }
  obtenerJugadoresLibres():Observable<Jugador[]>{
    const url = `${this.baseUrl}jugador`;
    const httpHeaders=new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    return this.http.get<Jugador[]>(url,{headers:httpHeaders});
  }
  /**
   * Método que elimina un jugador de un equipo y cambia el estado de un jugador  de no disponible a libre
   * @param idjugador id del jugador que se quiere despedir
   * @returns observable con el jugador que se ha despedido
   */
  despedirJugador(idjugador:number):Observable<Jugador>{
    const url = this.baseUrl+"jugador/"+idjugador;
    const jugador:Jugador={
      id: 0,
      nombre: '',
      edad: '',
      peso: '',
      altura: '',
      indiceVictoria: 0,
      precio: 0,
      estatus: '',
      imagen: ''
    }
    const httpHeaders=new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    return this.http.put<Jugador>(url,jugador,{headers:httpHeaders});
  }
  venderJugador(idjugador:number):Observable<Jugador>{
    const url = this.baseUrl+"jugador/"+idjugador+"?filtro=vender";
    const jugador:Jugador={
      id: 0,
      nombre: '',
      edad: '',
      peso: '',
      altura: '',
      indiceVictoria: 0,
      precio: 0,
      estatus: '',
      imagen: ''
    }
    const httpHeaders=new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    return this.http.put<Jugador>(url,jugador,{headers:httpHeaders});
  }
  recuperarJugador(idjugador:number):Observable<Jugador>{
    const url = this.baseUrl+"jugador/"+idjugador+"?filtro=recuperar";
    const jugador:Jugador={
      id: 0,
      nombre: '',
      edad: '',
      peso: '',
      altura: '',
      indiceVictoria: 0,
      precio: 0,
      estatus: '',
      imagen: ''
    }
    const httpHeaders=new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    return this.http.put<Jugador>(url,jugador,{headers:httpHeaders});
  }

  enviarOferta(oferta:Oferta):Observable<Oferta>{
    const url = this.baseUrl+"oferta/";
    const httpHeaders=new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    return this.http.post<Oferta>(url,oferta,{headers:httpHeaders});
  }

}
