import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MessageService } from 'primeng/api';
import { AuthResponse, Equipo, Jornada} from 'src/app/interfaces/interface';
import { EquipoService } from 'src/app/services/equipo.service';
import { JornadaService } from 'src/app/services/jornada.service';
import { UserSubjectNavbarService } from 'src/app/services/user-subject-navbar.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-verpartidos',
  templateUrl: './verpartidos.component.html',
  styleUrls: ['./verpartidos.component.css'],
  providers:[MessageService]
})
/**
 * Clase para ver los partidos que existen
 */
export class VerpartidosComponent implements OnInit {
  //Atributos
  private jwt:JwtHelperService= new JwtHelperService();
  userDetails!: AuthResponse | null;
  idEquipo!:number;
  mostrar:boolean = false;
  jornadas!:Jornada[];
  idequipo!:number;
  roll!:string;
  nickname!:string
  //Constructor
  constructor(private serviciojornada: JornadaService,
    private servicioEquipo:EquipoService,
    private router:Router,
    private messageService: MessageService,
    private userSubject:UserSubjectNavbarService,
    private servicioUsuario:UsuarioService) {
      this.userSubject.userDetails$.subscribe(data => setTimeout(() => this.userDetails = data, 0));
    }
  //Cargamos las jornadas y obtenemos el equipo
  ngOnInit(): void {
    let token = this.servicioUsuario.getToken();
    if (token != null) {
      this.userDetails = this.jwt.decodeToken(
        JSON.stringify(token)
      );
      this.userSubject.changeNavBar(this.userDetails);
    }
    this.cargarJornadas();
    this.obtenerEquipo();
  }

  /**
   * Obtiene la lista de partidos
   */
  cargarJornadas(){
    this.serviciojornada.obtenerJornadas().subscribe({
      next:(resp)=> {
        this.jornadas=resp;
        this.jornadas.sort(((a, b) => a.id - b.id));
        this.mostrar=true;
        if(this.jornadas.length==0){
          this.messageService.add({severity:'info', detail:'Aun no hay partidos disponibles', life:1500});
          setTimeout(() =>  this.router.navigate(['/home']), 1000);
        }
      }
    })
  }
  /**
   * Obtenemos el equipo que tenemos
   */
  obtenerEquipo(){
    this.servicioEquipo.obtenerEquipo().subscribe({
      next:(resp=>{
        this.idEquipo=resp.id;
      })
    })
  }

  /**
   * Boton donde nos lleva a alinear
   * @param idjornada
   * @param idpartido
   */
  alinear(idjornada:number,idpartido:number){
    this.router.navigateByUrl("alinear?idjornada="+idjornada+"&idpartido="+idpartido);
  }
  /**
   * Metodo para reconstruir la imagen.
   * @returns
   */
  obtenerImagen(equipo:Equipo){
    const base64String = btoa(String.fromCharCode(...new Uint8Array(equipo.imagen)));
    const source = `data:image/png;base64,${base64String}`+equipo.imagen;
    return source;
  }

  formatHeaderTab(jornada:Jornada):string{
    return `Jornada ${jornada.id}`;
  }

}
