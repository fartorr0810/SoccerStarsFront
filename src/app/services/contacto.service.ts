import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Mensaje } from 'src/app/interfaces/interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
/**
 * Servicio de contacto
 */
export class ContactoService {
  private baseUrl: string = environment.baseURL;
  constructor(private http:HttpClient) { }

  /**
   * Metodo para contactar con nosotros
   * @param mensaje que se va a enviar
   * @returns devuelbe un observable booleano.
   */
  enviarMensaje(mensaje:Mensaje){
    const url = `${this.baseUrl}contacto`;
    return this.http.post<Boolean>(url,mensaje);
  }
}
