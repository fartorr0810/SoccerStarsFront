import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MessageService } from 'primeng/api';
import { AuthResponse, UsuarioEdit, UsuarioResponse } from 'src/app/interfaces/interface';
import { UserSubjectNavbarService } from 'src/app/services/user-subject-navbar.service';
import { UsuarioService } from 'src/app/services/usuario.service';


@Component({
  selector: 'app-editar-user',
  templateUrl: './editar-user.component.html',
  styleUrls: ['./editar-user.component.css'],
  providers:[MessageService]
})
export class EditarUserComponent implements OnInit {
  private jwt:JwtHelperService= new JwtHelperService();
  userDetails!: AuthResponse | null;
  mostrar:boolean=false;
  idUser!:number;
  rol!:string;
  nickname!:string;
  usuario!:UsuarioResponse;
  patronEmail: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";


  constructor(private router:Router,
    private servicioUser:UsuarioService,
    private formBuilder: FormBuilder,
    private userSubject:UserSubjectNavbarService,
    private messageService: MessageService) {
      this.userSubject.userDetails$.subscribe(data => setTimeout(() => this.userDetails = data, 0));
     }

  ngOnInit(): void {
    let token = this.servicioUser.getToken();
    if (token != null) {
      this.userDetails = this.jwt.decodeToken(
        JSON.stringify(token)
      );
      this.userSubject.changeNavBar(this.userDetails);
    }
    this.obtenerUsuario();
    this.obtenerIdUser();
  }

  formEdit:FormGroup=this.formBuilder.group({
    nombreusuario:[,[Validators.required,Validators.minLength(4)]],
     email:[,[Validators.required, Validators.email]],
     password:[,[Validators.minLength(8)]]
  })


  obtenerUsuario(){
    this.servicioUser.obtenerUser().subscribe({
      next:(resp=>{
        this.usuario=resp;
        this.formEdit.controls['nombreusuario'].setValue(resp.nombreusuario);
        this.formEdit.controls['email'].setValue(resp.email);
        this.mostrar=true;
      }),
      error:(err=>{
        this.messageService.add({severity:'error',detail:err.error.mensaje, life:1500});
      })
    });
  }

  obtenerIdUser(){
    this.idUser=this.servicioUser.obtenerIdUsuario();
  }


  notValidField( campo: string ) {
    return this.formEdit.get(campo)?.invalid
    && this.formEdit.get(campo)?.touched;
  }


  get PasswordErrorMsg(): string {

    const errors = this.formEdit.get('password')?.errors!;
    if ( errors['required'] ) {
      return 'Campo obligatorio';
    }else if(errors['minlength']){
      return "Debe tener como mínimo 8 caracteres";
    }
    return '';}

  editar(){
    const userEdit:UsuarioEdit ={
      email: this.formEdit.get('email')?.value,
      nombreusuario: this.formEdit.get('nombreusuario')?.value,
      password: this.formEdit.get('password')?.value
    }
    this.servicioUser.editarUser(this.idUser,userEdit).subscribe({
      next:((resp)=>{
        this.userSubject.rechargeNameUser(resp.nombreusuario);
        this.messageService.add({severity:'success',detail:'Usuario editado', life:1500});
      }),
      error:(err=>{
        this.messageService.add({severity:'error',detail:err.error.mensaje, life:1500});
      })
    })
  }


  get mensajesErrores() {
    const errors = this.formEdit.get('email')?.errors!;
    if ( errors['required'] ) {
      return 'El campo correo electrónico es obligatorio';
    } else if ( errors[''] ) {
      return 'El dato introducido es incorrecto';
    } else if ( errors['emailenuso'] ) {
      return 'Este correo electrónico ya fue registrado por otro usuario';
    } else if( errors['pattern']){
      return "Indique un correo en formato:  'example@email.com'";
    }

    return '';
  }

  get mensajesErroresNickname() {
    const errors = this.formEdit.get('nombreusuario')?.errors!;
    if ( errors['required'] ) {
      return 'El campo nickname es obligatorio';
    } else if ( errors['pattern'] ) {
      return 'El dato introducido es incorrecto';
    } else if ( errors['nicknameenuso'] ) {
      return 'Este nombre de usuario ya fue registrado por otro usuario';
    }else if(errors['minlength']){
      return "Debe tener un mínimo de 4 caracteres"
    }
    return '';
  }

  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];
    if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
    return;
    }
    if (control.value !== matchingControl.value) {
    matchingControl.setErrors({ mustMatch: true });
    } else {
    matchingControl.setErrors(null);
    }
    }
    }



}
