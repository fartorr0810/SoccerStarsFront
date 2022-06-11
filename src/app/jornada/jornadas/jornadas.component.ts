import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MessageService } from 'primeng/api';
import {AuthResponse, Equipo, Jornada, LigaJornadas, Partido } from 'src/app/interfaces/interface';
import { JornadaService } from 'src/app/services/jornada.service';
import { LigaService } from 'src/app/services/liga.service';
import { UserSubjectNavbarService } from 'src/app/services/user-subject-navbar.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-jornadas',
  templateUrl: './jornadas.component.html',
  styleUrls: ['./jornadas.component.css'],
  providers:[MessageService]
})
/**
 * Clase con el componente Jornadas
 */
export class JornadasComponent implements OnInit {
  //Atributos
  private jwt:JwtHelperService= new JwtHelperService();
  userDetails!: AuthResponse | null;
  liga!:LigaJornadas;
  jornadas!:Jornada[];
  roll!:string;
  nickname!:string
  mostrar:boolean=false;
  //Constructor
  constructor(private servicioLiga:LigaService,private router:Router,private servicioJornada:JornadaService,
    private userSubject:UserSubjectNavbarService,
    private servicioUsuario:UsuarioService,
    private messageService: MessageService) {
      this.userSubject.userDetails$.subscribe(data => setTimeout(() => this.userDetails = data, 0));
    }
  //Obtenemos las ligas

  ngOnInit(): void {
    let token = this.servicioUsuario.getToken();
    if (token != null) {
      this.userDetails = this.jwt.decodeToken(
        JSON.stringify(token)
      );
      this.userSubject.changeNavBar(this.userDetails);
    }
    this.obtenerLiga();
  }
  /**
   * Metodo para obtener la liga
   */
  obtenerLiga(){
    this.servicioLiga.obtenerLigas().subscribe({
      next:(resp=>{
        this.liga=resp;
        this.jornadas=this.liga.jornadas;
        this.mostrar=true;
        this.jornadas.sort(((a, b) => a.id - b.id));
        if(this.jornadas.length==0){
          this.messageService.add({severity:'info',detail:'Debe iniciar la liga', life:1500});
          setTimeout(() =>  this.router.navigate(['/home']), 1000);
        }
      }),
      error:(err=>{
        this.messageService.add({severity:'error',detail:err.error.mensaje, life:1500});
      })
    })
  }
  /**
   * Metodo que reconstruye los bits de la imagen
   * @param equipo
   * @returns
   */
  obtenerImagen(equipo:Equipo){
    const base64String = btoa(String.fromCharCode(...new Uint8Array(equipo.imagen)));
    const source = `data:image/png;base64,${base64String}`+equipo.imagen;
    return source;
  }

  jugarJornada(id:number){
    this.servicioJornada.jugarJornada(id).subscribe({
      next:(()=>{
        this.messageService.add({severity:'success',detail: `Jornada ${id} jugada`, life:1500});
        this.obtenerLiga();
      }),
      error:(err=>{
        this.messageService.add({severity:'error',detail:err.error.mensaje, life:1500});
      })
    })

  }


  formatHeaderTab(jornada:Jornada):string{
    return `Jornada ${jornada.id}`;
  }
}
