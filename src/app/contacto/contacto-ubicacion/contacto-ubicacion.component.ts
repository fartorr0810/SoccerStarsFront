import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MessageService } from 'primeng/api';
import { AuthResponse, Mensaje } from 'src/app/interfaces/interface';
import { ContactoService } from 'src/app/services/contacto.service';
import { UserSubjectNavbarService } from 'src/app/services/user-subject-navbar.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-contacto-ubicacion',
  templateUrl: './contacto-ubicacion.component.html',
  styleUrls: ['./contacto-ubicacion.component.css'],
  providers:[MessageService]
})
export class ContactoUbicacionComponent implements OnInit {
  private jwt:JwtHelperService= new JwtHelperService();
  userDetails!: AuthResponse | null;
   /**
   * Formulario con los datos y validaciones para enviar un mensaje
   */
    formulario: FormGroup = this.fb.group({
      email:['', [Validators.email,Validators.required,Validators.pattern('[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}')]],
      nombre:['',[Validators.pattern(/^(?=.{3,15}$)[A-ZÁÉÍÓÚ][a-zñáéíóú]+(?: [A-ZÁÉÍÓÚ][a-zñáéíóú]+)?$/), Validators.required]],
      apellidos:['',[Validators.pattern(/^(?=.{3,15}$)[A-ZÁÉÍÓÚ][a-zñáéíóú]+(?: [A-ZÁÉÍÓÚ][a-zñáéíóú]+)?$/),Validators.required]],
      comentario:['',[Validators.minLength(10),Validators.maxLength(500), Validators.required]]
    });
//Constructor
  constructor(private fb: FormBuilder,private router:Router,private servicioContacto:ContactoService,
    private messageService: MessageService, private userSubject:UserSubjectNavbarService,
    private servicioUsuario:UsuarioService) {
      this.userSubject.userDetails$.subscribe(data => setTimeout(() => this.userDetails = data, 0));
    }
//NgOnInit con la inicalizacion del formulario.
  ngOnInit(): void {
    let token = this.servicioUsuario.getToken();
    if (token != null) {
      this.userDetails = this.jwt.decodeToken(
        JSON.stringify(token)
      );
      this.userSubject.changeNavBar(this.userDetails);
    }
    this.formulario.reset({
      email:'',
      nombre:'',
      apellidos:'',
      comentario:''
    })
  }

   /**
   * Comprueba el estado de los campos del formulario una vez han sido introducido datos o pasado por encima.
   * @param campo que ha activado el error
   * @returns  mensaje de error
   */
    campoEsValido( campo: string ) {
      return this.formulario.controls[campo].errors && this.formulario.controls[campo].touched;
    }

    /**
   * Muestra una alerta al validar y enviar el comentario
   */
  enviar(){
    let mensaje:Mensaje = this.formulario.value;
    this.servicioContacto.enviarMensaje(mensaje)
    .subscribe({
      next: (() =>{
        this.messageService.add({severity:'success',summary:'Su consulta ha sido enviada', detail:'Intentaremos responder lo antes posible', life:1500});
      }),
      error: err=>{
        this.messageService.add({severity:'error',summary:'Intentelo en otra ocasión',detail:err.error.mensaje, life:1500});
      }
    })
  }

}
