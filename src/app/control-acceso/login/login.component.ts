import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthResponse, UsuarioLogin } from 'src/app/interfaces/interface';
import { ControlAccesoService } from 'src/app/services/control-acceso.service';
import { UserSubjectNavbarService } from 'src/app/services/user-subject-navbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
  providers:[MessageService]
})
/**
 * Clase Login
 */
export class LoginComponent implements OnInit {
  //Formulario que construimos
  userDetails!: AuthResponse | null;
//Usuario con los campos necesarios
  usuario: UsuarioLogin={
    email:'',
    password:''
  }
  //Constructor donde inyectamos lo que necesitamos
  constructor(
      private router: Router,
      private authservice: ControlAccesoService,
      private userSubject:UserSubjectNavbarService,
      private messageService: MessageService) {
  }

  ngOnInit(): void {
  }

/**
 * Metodo login , en caso de que los formularios tenga valores, se llamara al servicio authservice
 * y llamaremos al metodo login y le pasaremos los campos necesarios, nos suscribiremos
 * y si es correcto , nos guardara en el localstorage el token que nos devolvera y nos llevara
 * al componente home.
 * Si hay algun error , se mostrara al usuario un mensaje de error.
 */
  login(){
    if (this.usuario.email!='' || this.usuario.password!=''){
      this.authservice.login(this.usuario.email,this.usuario.password).subscribe({
        next:(resp=>{
          localStorage.setItem('token',resp.access_token!)
          this.userSubject.changeNavBar(this.userDetails);

          this.router.navigate(['/home']);
        }),
        error:(err)=>{
          this.messageService.add({severity:'error', detail:err.error.mensaje, life:1500});
        }
      })
    }
  }


}
