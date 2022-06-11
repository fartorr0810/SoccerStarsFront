import { Component, OnInit, ViewChild } from '@angular/core';
import {  Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DataTableDirective } from 'angular-datatables';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { AuthResponse, Equipo, LigaJornadas } from 'src/app/interfaces/interface';
import { EquipoService } from 'src/app/services/equipo.service';
import { LigaService } from 'src/app/services/liga.service';
import { UserSubjectNavbarService } from 'src/app/services/user-subject-navbar.service';
import { UsuarioService } from 'src/app/services/usuario.service';


@Component({
  selector: 'app-administrar-liga',
  templateUrl: './administrar-liga.component.html',
  styleUrls: ['./administrar-liga.component.css'],
  providers:[MessageService]
})
/**
 * Componente para administrar la liga
 */
export class AdministrarLigaComponent implements OnInit {
  //Atributos
  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;

  private jwt:JwtHelperService= new JwtHelperService();
  userDetails!: AuthResponse | null;
  roll!:string;
  nickname!:string;
  mostrar:boolean = false;
  liga!:LigaJornadas;
  listaEquipos:Equipo[]=[];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  //Constructor
  constructor(private servicioLiga:LigaService, private router:Router,
    private servicioEquipo:EquipoService,private userSubject:UserSubjectNavbarService,
    private servicioUsuario:UsuarioService,
    private messageService: MessageService) {
      this.userSubject.userDetails$.subscribe(data => setTimeout(() => this.userDetails = data, 0));
     }
    //Obtenemos la liga y construimos el datatable
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
        url: 'http://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json'
      }
    };
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next(null);
    });
  }

  /**
   * Método para obtener la liga
   */
  obtenerLiga(){
    this.servicioLiga.obtenerLigas().subscribe({
      next:(resp=>{
        this.liga=resp;
        this.listaEquipos=this.liga.equipos;
        if(this.listaEquipos.length==0){
          this.messageService.add({severity:'info',detail:'No hay equipos admitidos', life:1500});

          setTimeout(() =>  this.router.navigate(['/home']), 1000);
        }else{
          this.dtTrigger.next(null);
        }
      }),
      error:(err=>{
        this.messageService.add({severity:'error',detail:err.error.mensaje, life:1500});
      })
    })
  }

  obtenerImagen(equipo:Equipo){
    const base64String = btoa(String.fromCharCode(...new Uint8Array(equipo.imagen)));
    const source = `data:image/png;base64,${base64String}`+equipo.imagen;
    return source;
  }

  eliminarEquipo(idEquipo:number){
    this.servicioEquipo.borrarEquipo(idEquipo).subscribe({
      next:(()=>{
        this.messageService.add({severity:'success',detail:'Equipo borrado', life:1500});
        const index = this.listaEquipos.map(equipo=> equipo.id).indexOf(idEquipo);
        this.listaEquipos.splice(index,1);

        this.servicioLiga.obtenerLigas().subscribe({
          next:(resp=>{

            this.userSubject.rechargeMiembrosLiga(resp);
          })
        })
        this.rerender();
      }),
      error:(err=>{
        this.messageService.add({severity:'error',detail:err.error.mensaje, life:1500});
      })
    })
  }

}
