import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MessageService } from 'primeng/api';
import { AuthResponse, CrearNotificacion} from 'src/app/interfaces/interface';
import { BuzonService } from 'src/app/services/buzon.service';
import { LigaService } from 'src/app/services/liga.service';
import { UserSubjectNavbarService } from 'src/app/services/user-subject-navbar.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-crearmensajecomunidad',
  templateUrl: './crearmensajecomunidad.component.html',
  styles: [],
  providers:[MessageService]
})
/**
 * Clase donde creamos los mensajes de comunidad
 */
export class CrearmensajecomunidadComponent implements OnInit {
  //Atributos
  private jwt:JwtHelperService= new JwtHelperService();
  userDetails!: AuthResponse | null;
  noti:CrearNotificacion={
    mensaje: '',
    tipo: 'noticia',
    liga: ''
  }
  //Constructor
  constructor(private servicioBuzon:BuzonService, router:Router,private messageService: MessageService,
    private userSubject:UserSubjectNavbarService,
    private servicioUsuario:UsuarioService,
    private servicioLiga:LigaService) {
      this.userSubject.userDetails$.subscribe(data => setTimeout(() => this.userDetails = data, 0));
     }

  ngOnInit(): void {
    let token = this.servicioUsuario.getToken();
    if (token != null) {
      this.userDetails = this.jwt.decodeToken(
        JSON.stringify(token)
      );
      this.userSubject.changeNavBar(this.userDetails);
      this.obtenerLiga();
    }
  }
  /**
   * Metodo para enviar el mensaje
   */
  enviarMensaje(){
    this.servicioBuzon.enviarMensajeComunidad(this.noti).subscribe({
      next:(resp=>{
        this.messageService.add({severity:'success',summary:'Noticia creada', detail:'La noticia sera publica para los usuarios de esa liga', life:1500});
      }),
      error:err=>{
        this.messageService.add({severity:'error',summary:'Intentelo en otra ocasión',detail:err.error.mensaje, life:1500});
      }
    })
  }


  obtenerLiga(){
    this.servicioLiga.obtenerLigas().subscribe({
      next:(resp=>{
        this.noti.liga=resp.nombre;
      }),
      error:(err=>{
        this.messageService.add({severity:'error',detail:err.error.mensaje, life:1500});
      })
    })
  }
}
