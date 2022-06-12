import { Component,OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DataTableDirective } from 'angular-datatables';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { AuthResponse, Equipo, Jugador } from 'src/app/interfaces/interface';
import { EquipoService } from 'src/app/services/equipo.service';
import { JugadorServiceService } from 'src/app/services/jugador-service.service';
import { UserSubjectNavbarService } from 'src/app/services/user-subject-navbar.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-ver-jugadores',
  templateUrl: './ver-jugadores.component.html',
  styleUrls: ['./ver-jugadores.component.css'],
  providers:[MessageService]
})
export class VerJugadoresComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;

  private jwt:JwtHelperService= new JwtHelperService();
  userDetails!: AuthResponse | null;
  rol!:string;
  nickname!:string;
  equipo!:Equipo;
  listajugadores:Jugador[]=[];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private router:Router,private servicioJugador:JugadorServiceService,
    private servicioEquipo:EquipoService,private messageService: MessageService,
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
   this.obtenerJugadores();
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


  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next(null);
    });
  }

  /**
   * Obtiene la id del jugador que se quiere despedir y llama al servicio de jugadores para realizar la petición
   * @param idjugador
   */
  despedirJugador(idjugador:number){
    this.servicioJugador.despedirJugador(idjugador).subscribe({
      next:(resp)=> {
        this.messageService.add({severity:'success',summary:resp.nombre+" esta despedido", detail: resp.precio+"€ Se ha añadido a tu presupuesto", life:1500});
        const index = this.listajugadores.map(jugador=> jugador.id).indexOf(resp.id);
        this.listajugadores.splice(index,1);

        this.servicioEquipo.obtenerEquipo().subscribe({
          next:(resp=>{
            this.userSubject.rechargePresupuesto(resp.presupuesto);
          })
        })

        this.rerender();

      },
      error:(err=>{
        this.messageService.add({severity:'error',detail:err.error.mensaje, life:1500});
      })
    })
  }
  venderJugador(idjugador:number){
    this.servicioJugador.venderJugador(idjugador).subscribe({
      next:(resp)=> {
        this.updateJugadorTable(resp);
        this.rerender();
        this.messageService.add({severity:'success',summary:resp.nombre+" esta puesto en venta", detail: 'Recibiras ofertas de otros usuarios en el buzon', life:1500});

      },
      error:(err=>{
        this.messageService.add({severity:'error',summary:'Intentelo en otra ocasión',detail:err.error.mensaje, life:1500});
      })
    })
  }
  recuperarJugador(idjugador:number){
    this.servicioJugador.recuperarJugador(idjugador).subscribe({
      next:(resp)=> {
        this.updateJugadorTable(resp);
        this.rerender();
        this.messageService.add({severity:'info',summary:resp.nombre+" ha vuelto a tu plantilla", detail: 'El jugador ha sido retirado del mercado', life:1500});
      },
      error:(err=>{
        this.messageService.add({severity:'error',detail:err.error.mensaje, life:1500});
      })
    })
  }
  /**
   * Obtiene la lista de jugadores de un equipo del usuario que se encuentra logueado
   */
  obtenerJugadores(){
    this.servicioEquipo.obtenerEquipo().subscribe({
      next:(resp)=> {
        this.listajugadores=resp.jugadores;
        if(this.listajugadores==null){
          this.messageService.add({severity:'info', detail:'No posees jugadores disponibles', life:1500});
        }
        else{
          this.dtTrigger.next(null);
        }
      }
    })
  }


  updateJugadorTable(jugador:Jugador){
    let pos:number=0
    let encontrado:boolean=false;
    while(!encontrado || pos<this.listajugadores.length){
      if(this.listajugadores[pos].id==jugador.id){
        this.listajugadores[pos]=jugador;
        encontrado=true;
      }
      pos++;
    }
  }




}
