
import { Component, OnInit, ViewChild} from '@angular/core';

import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DataTableDirective } from 'angular-datatables';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import {  AuthResponse, Jugador, Oferta } from 'src/app/interfaces/interface';
import { EquipoService } from 'src/app/services/equipo.service';
import { JugadorServiceService } from 'src/app/services/jugador-service.service';
import { UserSubjectNavbarService } from 'src/app/services/user-subject-navbar.service';
import { UsuarioService } from 'src/app/services/usuario.service';


@Component({
  selector: 'app-jugadores',
  templateUrl: './jugadores.component.html',
  styleUrls: ['./jugadores.component.css'],
  providers:[MessageService]
})
export class JugadoresComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;

  private jwt:JwtHelperService= new JwtHelperService();
  userDetails!: AuthResponse | null;
  rol!:string;
  nickname!:string;
  misJugadores:Jugador[]=[];
  listajugadores:Jugador[]=[];
  posiciones:number[]=[];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();


  constructor(private router:Router,
    private servicioJugador:JugadorServiceService,
    private servicioEquipo:EquipoService,
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
    this.obtenerJugadoresDelDia();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength:10,
      lengthMenu: [5,10,20],
      responsive:true,
      language: {
        url: 'https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json'
      }
    }

  }


  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next(null);
    });
  }

  comprarJugador(idjugador:number){
    let prueba =document.getElementById(idjugador.toString()) as HTMLInputElement;
    let valor:number=parseInt(prueba.value)
    const oferta: Oferta={
      idjugador:idjugador,
      precio:valor
    }
    this.servicioJugador.enviarOferta(oferta).subscribe({
      next:(resp)=> {
        const index = this.listajugadores.map(jugador=> jugador.id).indexOf(oferta.idjugador);
        let jugadorElegido:Jugador = this.listajugadores[index];
        if(jugadorElegido.estatus=='libre'){
          this.messageService.add({severity:'success',detail:'Se ha añadido el jugador', life:1500});
          this.listajugadores.splice(index,1);
          this.servicioEquipo.obtenerEquipo().subscribe({
            next:(resp=>{
              this.userSubject.rechargePresupuesto(resp.presupuesto);
            })
          })
        }else if(jugadorElegido.estatus=='en venta'){
          this.messageService.add({severity:'success',detail:'Se ha enviado la oferta', life:1500});
        }
        this.rerender();
      },
      error:(err=>{
        this.messageService.add({severity:'error',detail:err.error.mensaje, life:1500});
      })
    })
  }


  obtenerJugadoresDelDia(){
    this.servicioEquipo.obtenerEquipo().subscribe({
      next:(resp)=> {
        this.misJugadores=resp.jugadores;
        this.servicioJugador.obtenerJugadoresLibres().subscribe({
          next:(resp)=> {
            this.listajugadores=resp;
            let pos:number=0;
            while(pos<this.misJugadores.length){
              let index = this.listajugadores.map(jugador=> jugador.id).indexOf(this.misJugadores[pos].id);
              if(index!=-1){
                this.listajugadores.splice(index,1);
              }
              pos++;
            }
            this.dtTrigger.next(null)
          },
          error:(err=>{
            this.messageService.add({severity:'error',detail:err.error.mensaje, life:1500});
          })
        })
      }
    })
  }
}
