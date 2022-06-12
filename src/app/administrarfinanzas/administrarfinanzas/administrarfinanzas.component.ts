import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { AuthResponse, Equipo, LigaJornadas, OperacionPresupuesto } from 'src/app/interfaces/interface';
import { LigaService } from 'src/app/services/liga.service';
import { UserSubjectNavbarService } from 'src/app/services/user-subject-navbar.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-administrarfinanzas',
  templateUrl: './administrarfinanzas.component.html',
  styleUrls: ['./administrar-finanzas.component.css'],
  providers:[MessageService]

})
/**
 * Clase con el componente de administrar finanzas
 */
export class AdministrarfinanzasComponent implements OnInit {
  private jwt:JwtHelperService= new JwtHelperService();
  userDetails!: AuthResponse | null;
  //Atributos
  rol!:string;
  nickname!:string;
  liga!:LigaJornadas;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  mostrar:boolean=false;
  form!: FormGroup;


  //Obtenemos la liga y construimos la datatable
  constructor(private servicioliga:LigaService, private router:Router,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private userSubject:UserSubjectNavbarService,
    private servicioUsuario:UsuarioService) {
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

    this.obtenerLiga();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength:5,
      lengthMenu: [5,10,20],
      responsive:true,
      language: {
        url: 'https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json'
      }
    };
  }
  /**
   * Metodo para construir el formulario
   */
  buildForm(){
  this.form=this.formBuilder.group({
    equipo: ['',[Validators.required]],
    cantidad:['',[Validators.required,Validators.pattern('^[0-9]+')]],
    operacion: ['',[Validators.required]]
  })
  }

  notValidField( campo: string ) {
    return this.form.get(campo)?.invalid
    && this.form.get(campo)?.touched;
  }


  get CantidadErrorMsg(): string {

    const errors = this.form.get('cantidad')?.errors!;
    if ( errors['required'] ) {
      return 'Campo obligatorio';
    }else if(errors['pattern']){
      return "Debe indicar un número mayor que 0";
    }
    return '';}

  /**
   * Método donde aceptamos la operacion
   */
  confirmarOperacion(){
    let operacion: OperacionPresupuesto={
      cantidad: this.form.controls['cantidad'].value,
      tipo: this.form.controls['equipo'].value,
      tipoo: this.form.controls['operacion'].value,
    }


      this.servicioliga.editarPresupuestoEquipo(operacion.tipo,operacion).subscribe({
        next: (() =>{
          this.messageService.add({severity:'success', detail:'Operación realizada', life:1500});
        }),
        error: (err)=>{
          this.messageService.add({severity:'error', detail:err.error.mensaje, life:1500});
        }
      })

  }
  /**
   * Método para obtener la liga
   */
  obtenerLiga(){
    this.servicioliga.obtenerLigas()
    .subscribe({

      next:(resp=>{
        this.liga=resp;
        this.mostrar=true;
        this.buildForm();
        this.dtTrigger.next(null);
      }),
      error:(err)=>{
        this.messageService.add({severity:'error', detail:err.error.mensaje, life:1500});

      }
    })
  }
  /**
   * Método donde reconstruimos los bits de la imagen almacenada en la base de datos
   * @param equipo
   * @returns
   */
  obtenerImagen(equipo:Equipo){
    const base64String = btoa(String.fromCharCode(...new Uint8Array(equipo.imagen)));
    const source = `data:image/png;base64,${base64String}`+equipo.imagen;
    return source;
  }
}
