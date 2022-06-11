import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthResponse, Equipo } from 'src/app/interfaces/interface';
import { EquipoService } from 'src/app/services/equipo.service';
import { UserSubjectNavbarService } from 'src/app/services/user-subject-navbar.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-clasificacion',
  templateUrl: './clasificacion.component.html',
  styleUrls: ['./clasificiacion.component.css']
})
/**
 * Clase con la clasificacion
 */
export class ClasificacionComponent implements OnInit {
  //Atributos
  private jwt:JwtHelperService= new JwtHelperService();
  userDetails!: AuthResponse | null;
  clasificacion:Equipo[]=[];
  //Constructor
  constructor(private servicioEquipo:EquipoService,private userSubject:UserSubjectNavbarService,private servicioUser:UsuarioService) {
    this.userSubject.userDetails$.subscribe(data => setTimeout(() => this.userDetails = data, 0));
   }
  //Llama al metodo obtener clasificacion
  ngOnInit(): void {
    let token = this.servicioUser.getToken();
      if (token != null) {
        this.userDetails = this.jwt.decodeToken(
          JSON.stringify(token)
        );
        this.userSubject.changeNavBar(this.userDetails);
      }
    this.obtenerClasificacion();
  }
  /**
   * Metodo en la que llama al servicio de equipos y obtenemos la clasificacion
   */
  obtenerClasificacion(){
    this.servicioEquipo.obtenerClasificacion().subscribe({
      next:(resp)=> {
        this.clasificacion=resp;
      }
    })
  }
  /**
   * Metodo para obtener las imagenes de los equipos
   * @param equip   */
  obtenerImagen(equipo:Equipo){
    const base64String = btoa(String.fromCharCode(...new Uint8Array(equipo.imagen)));
    const source = `data:image/png;base64,${base64String}`+equipo.imagen;
    return source;
  }
}
