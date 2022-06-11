
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MessageService } from 'primeng/api';
import { AuthResponse, Equipo, EquipoDTO } from 'src/app/interfaces/interface';
import { EquipoService } from 'src/app/services/equipo.service';
import { UserSubjectNavbarService } from 'src/app/services/user-subject-navbar.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-editar-equipo',
  templateUrl: './editar-equipo.component.html',
  styleUrls: ['./editar-equipo.component.css'],
  providers:[MessageService]
})
export class EditarEquipoComponent implements OnInit {
  equipoName!: string |null;
  private jwt:JwtHelperService= new JwtHelperService();
  userDetails!: AuthResponse | null;
  mostrar:boolean=false;
  id!:number;
  roll!:string;
  nickname!:string;
  equipo!:Equipo;

  myForm = new FormGroup({
    nombre: new FormControl('',[Validators.required,Validators.minLength(5),Validators.maxLength(10)]),
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });



  constructor(private router:Router, private servicioEquipo:EquipoService,
    private messageService: MessageService,private userSubject:UserSubjectNavbarService,
    private servicioUsuario:UsuarioService) {
      this.userSubject.userDetails$.subscribe(data => setTimeout(() => this.userDetails = data, 0));
     }

  ngOnInit(): void {
    this.servicioEquipo.obtenerEquipo().subscribe({
      next:(resp=>{
        this.id=resp.id;
        this.equipo=resp;
        this.myForm.get('nombre')?.setValue(resp.nombre)
        this.mostrar=true;
      })
    })
    let token = this.servicioUsuario.getToken();
    if (token != null) {
      this.userDetails = this.jwt.decodeToken(
        JSON.stringify(token)
      );
      this.userSubject.changeNavBar(this.userDetails);
    }


    this.myForm.reset


  }

  // Formulario con los datos del equipo

  /**
   * Cuando se produce un evento de cambio se actualiza el campo file del formulario
   * @param event
   */
  onFileChange(event:any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.myForm.patchValue({
        fileSource: file
      });
    }
  }

  /**
   * Comprueba si hay errores en el formulario cuando se produce eventos de cambio o pasar por encima
   * @param campo del formulario
   * @returns error
   */
  campoEsValido( campo: string ) {
    return this.myForm.controls[campo].errors && this.myForm.controls[campo].touched;
  }



  /**
   * Obtiene los datos del formulario validados y llama al servicio para realizar la petición de editar los datos del equipo
   */
  editar(){
    const equipo:EquipoDTO = {
      nombre: this.myForm.get('nombre')?.value,
    }
    const formData = new FormData();
    formData.append('file', this.myForm.get('fileSource')!.value);

    this.servicioEquipo.editarEquipo(equipo, this.id, formData).subscribe({
      next:((resp)=>{
        this.equipo.imagen=resp.imagen;
        this.userSubject.rechargeNameEquipo(resp.nombre);
        this.messageService.add({severity:'success',detail:'Equipo editado', life:1500});
      }),
      error: (err)=>{
        this.messageService.add({severity:'error',detail:err.error.mensaje, life:1500});
      }
    })
  }

  obtenerImagen(equipo:Equipo){
    const base64String = btoa(String.fromCharCode(...new Uint8Array(equipo.imagen)));
    const source = `data:image/png;base64,${base64String}`+equipo.imagen;
    return source;
  }

}
