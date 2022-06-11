import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthResponse, UsuarioRegister } from 'src/app/interfaces/interface';
import { ControlAccesoService } from 'src/app/services/control-acceso.service';
import { EmailvalidatorService } from 'src/app/services/email-validator.service';
import { NicknameValidatorService } from 'src/app/services/nickname-validator.service';
import { UserSubjectNavbarService } from 'src/app/services/user-subject-navbar.service';


@Component({
  selector: 'app-register',
  templateUrl: './registro.component.html',
  styles: [],
  providers:[MessageService]
})
export class RegistroComponent implements OnInit {
  userDetails!: AuthResponse | null;
 //Formulario
 formulario!:FormGroup;
 patronEmail: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

 //Constructor donde inyectamos el formbuilder y el authservice
 constructor(private formBuilder: FormBuilder,private authservice: ControlAccesoService,
   private router:Router,
   private validatorService:EmailvalidatorService,
   private validatorServiceNombreusuario:NicknameValidatorService,
   private userSubject:UserSubjectNavbarService,
   private messageService: MessageService) { }

 ngOnInit(): void {
   this.buildForm();
 }
//Metodo en el que indicamos los requisitos de cada campo y se construye el formulario
 buildForm(){
   this.formulario=this.formBuilder.group({
    nombreusuario:['',[Validators.required,Validators.minLength(4)],
    [ this.validatorServiceNombreusuario ]],
     email:['',[Validators.required,Validators.email,
      Validators.pattern( this.patronEmail ) ], [ this.validatorService ]],
     password:['',[Validators.required,Validators.minLength(5)]],
     rol:['',[Validators.required]]
   })
 }
/**
* Comprueba que el campo que se introduce es valido o no y devuelve true o false
* @param campo campo que se le introduce
* @returns  devuelve true o false
*/
 campoEsValido(campo:string) {
   return this.formulario.controls[campo].errors
      && this.formulario.controls[campo].touched;
 }

 mostrarPassword() {
   var x:any = document.getElementById("myInput");
   if (x.type === "password") {
     x.type = "text";
   } else {
     x.type = "password";
   }
 }
 get mensajesErrores() {
   const errors = this.formulario.get('email')?.errors!;
   if ( errors['required'] ) {
     return 'El campo correo electrónico es obligatorio';
   } else if ( errors['email'] ) {
     return 'Debe indicar un correo válido';
   } else if ( errors['emailenuso'] ) {
     return 'Este correo electrónico ya fue registrado por otro usuario';
   }
   return '';
 }
 get mensajesErroresNickname() {
  const errors = this.formulario.get('nombreusuario')?.errors!;
  if ( errors['required'] ) {
    return 'El campo nickname es obligatorio';
  } else if ( errors['pattern'] ) {
    return 'El dato introducido es incorrecto';
  } else if ( errors['nicknameenuso'] ) {
    return 'Este nombre de usuario ya fue registrado por otro usuario';
  }
  return '';
}
 /**
  *Metodo para registrar un usuario, mete en una variable los datos del formulario.
  Comprueba que todos los campos que se introducen son correctos. Luego llama al servicio
  al metodo register con los campos necesarios que se requieren subscribiendonos y una vez todo
  se haya resuelto correctamente, almacenamos en el localstorage el token.
  Si el email introducido es email pero existe en la base de datos, nos devolvera un mensaje
  de error con que ese email esta ya utilizado,
  */
 async register(){
   const user=this.formulario.value;
   if (this.formulario.value && !this.formulario.controls['email'].errors &&
   !this.formulario.controls['nombreusuario'].errors && !this.formulario.controls['email'].errors
   && !this.formulario.controls['password'].errors){
     let usuario:UsuarioRegister={
       email: this.formulario.value.email,
       password: this.formulario.value.password,
       nombreusuario: this.formulario.value.nombreusuario,
       rol: this.formulario.value.rol
     }
     this.authservice.register(usuario).subscribe({
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

