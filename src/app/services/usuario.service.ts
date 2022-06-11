import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { UsuarioEdit, UsuarioResponse } from 'src/app/interfaces/interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  nombreusuario!:string;
  public jwtHelper: JwtHelperService = new JwtHelperService();
  private baseUrl: string = environment.baseURL;
  constructor(private http: HttpClient) { }


  obtenerIdUsuario():number{
    let token = localStorage.getItem("token")!;
    let id = this.jwtHelper.decodeToken(token).id;
    return id;
  }

  obtenerNombreUsuario():string{
    let token = localStorage.getItem("token")!;
    return this.jwtHelper.decodeToken(token).nombreusuario;
  }

  obtenerUser():Observable<UsuarioResponse>{
    let direccionurl=this.baseUrl+"user";
    const httpHeaders=new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    return this.http.get<UsuarioEdit>(direccionurl,{headers :httpHeaders});
  }



  editarUser(id:number,userEdit:UsuarioEdit ):Observable<UsuarioResponse>{
    let direccionurl=`${this.baseUrl}user/${id}`;
    console.log(direccionurl);
    const httpHeaders=new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    return this.http.put<UsuarioResponse>(direccionurl,userEdit,{headers:httpHeaders});
  }

  obtenerRol():string{
    let token = localStorage.getItem("token")!;
    let rol = this.jwtHelper.decodeToken(token).rol;
    return rol;
  }

  getToken(){
    return localStorage.getItem('token');

  }
}
