import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MessageService } from 'primeng/api';
import { AuthResponse, Liga} from 'src/app/interfaces/interface';
import { LigaService } from 'src/app/services/liga.service';
import { UserSubjectNavbarService } from 'src/app/services/user-subject-navbar.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-crear-liga',
  templateUrl: './crear-liga.component.html',
  styleUrls: ['./crear-liga.component.css'],
  providers:[MessageService]
})
export class CrearLigaComponent implements OnInit {
  //Atributos
  private jwt:JwtHelperService= new JwtHelperService();
  userDetails!: AuthResponse | null;
  liga:Liga={
    nombre:'',
  }

  roll!:string;
  nickname!:string;
  //Constructor
  constructor(private servicioLiga:LigaService, private router:Router,
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

  }
  /**
   * Metodo para crear la liga llamando al servicio,
   * si existe un error lanza una alerta
   */
  crearLiga(){
    this.servicioLiga.crearLiga(this.liga).subscribe({
      next:(()=>{
        this.messageService.add({severity:'success',summary: 'Liga Creada',detail:'Tu decides cuando empieza', life:1500});
        setTimeout(() =>  this.router.navigate(['/home']), 1000);
      }),
      error:(err=>{
        this.messageService.add({severity:'error',detail:err.error.mensaje, life:1500});
      })
    })
  }

}
