import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MessageService } from 'primeng/api';
import { AuthResponse, Notificacion } from 'src/app/interfaces/interface';
import { BuzonService } from 'src/app/services/buzon.service';
import { UserSubjectNavbarService } from 'src/app/services/user-subject-navbar.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-listarmensajecomunidad',
  templateUrl: './listarmensajecomunidad.component.html',
  styles: [],
  providers:[MessageService]
})
/**
 * Componente para listar mensajes de la comunidad
 */
export class ListarmensajecomunidadComponent implements OnInit {
  //Atributos
  private jwt:JwtHelperService= new JwtHelperService();
  userDetails!: AuthResponse | null;
  listademensajes:Notificacion[]=[];
  roll!:string;
  nickname!:string;
  //Constructor
  constructor(private serviciobuzon: BuzonService,private router:Router,
    private userSubject:UserSubjectNavbarService,
    private servicioUsuario:UsuarioService,
    private messageService: MessageService) {
      this.userSubject.userDetails$.subscribe(data => setTimeout(() => this.userDetails = data, 0));
    }

  ngOnInit(): void {
    let token = this.servicioUsuario.getToken();
    if (token != null) {
      this.userDetails = this.jwt.decodeToken(
        JSON.stringify(token)
      );
      this.userSubject.changeNavBar(this.userDetails);
    }
    this.cargarMensajesComununidad();
  }
  /**
   * Metodo que carga las noticias de la comunidad llamando al metodo del servicio
   * y suscribiendose
   */
  cargarMensajesComununidad(){
    this.serviciobuzon.cargarNoticias().subscribe({
      next:(resp)=> {
        this.listademensajes=resp;
        if(this.listademensajes==null){
          this.messageService.add({severity:'info', detail:'No existen noticias', life:1500});
        }
      },error:(err)=> {
        this.messageService.add({severity:'info', detail:'Bandeja vacía', life:1500});
      }
    })
  }
}
