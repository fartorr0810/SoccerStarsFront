import { Component, OnInit } from "@angular/core";
import {CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Alineacion, AuthResponse, Equipo, Jugador } from "src/app/interfaces/interface";
import Swal from "sweetalert2";
import { ActivatedRoute, Router } from "@angular/router";
import { EquipoService } from "src/app/services/equipo.service";
import { JugadorServiceService } from "src/app/services/jugador-service.service";
import { MessageService } from "primeng/api";
import { JwtHelperService } from "@auth0/angular-jwt";
import { UserSubjectNavbarService } from "src/app/services/user-subject-navbar.service";
import { UsuarioService } from "src/app/services/usuario.service";

@Component({
  selector: 'app-alinear',
  templateUrl: './alinear.component.html',
  styleUrls: [],
  providers:[MessageService]
})
/**
 * Clase con el componente de alinear
 */
export class AlinearComponent implements OnInit {
  //Atributos
  private jwt:JwtHelperService= new JwtHelperService();
  userDetails!: AuthResponse | null;
  listajugadores!:Jugador[]
  del1:Jugador[]=[];
  del2:Jugador[]=[];
  del3:Jugador[]=[];
  mid1:Jugador[]=[];
  mid2:Jugador[]=[];
  mid3:Jugador[]=[];
  mid4:Jugador[]=[];
  def1:Jugador[]=[];
  def2:Jugador[]=[];
  def3:Jugador[]=[];
  por:Jugador[]=[];
  idjornada!:number;
  idpartido!:number;
  rol!:string;
  nickname!:string;

  ngOnInit(): void {
    let token = this.servicioUsuario.getToken();
    if (token != null) {
      this.userDetails = this.jwt.decodeToken(
        JSON.stringify(token)
      );
      this.userSubject.changeNavBar(this.userDetails);
    }
  }
  //Constructor donde cargaremos los jugadores que podra arrastrar el usuario.
  constructor(private serviciojugador:JugadorServiceService,private servicioEquipo:EquipoService,
    private router:Router,
    private rutaactiva: ActivatedRoute,
    private messageService: MessageService,
    private userSubject:UserSubjectNavbarService,
    private servicioUsuario:UsuarioService){
      this.userSubject.userDetails$.subscribe(data => setTimeout(() => this.userDetails = data, 0));
    this.serviciojugador.obtenerJugadoresEquipo().subscribe({
      next:(resp)=> {
        this.listajugadores=resp.jugadores;
        if(this.listajugadores==null){
          this.messageService.add({severity:'info', detail:'No posees jugadores disponibles', life:1500});
        }
        else{
        }
      }
    })
    this.rutaactiva.queryParams.subscribe(params=>{
      this.idpartido=params['idpartido']
      this.idjornada=params['idjornada']
    });
  }
  /**
   * Metodo que recoge el objeto , lo almacena etc con API AND DRAG
   * @param event
   */
  drop(event: CdkDragDrop<Jugador[]>) {
    if (event.previousContainer === event.container) {
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      } else {
        if(this.comprobarlongitudarray(event.container.data)){
          transferArrayItem(
            event.previousContainer.data,
            event.container.data,
            event.previousIndex,
            event.currentIndex,
          );
        }
    }
  }
  /**
   * Metodo para cada posicion solo tenga UN JUGADOR
   * @returns
   */
  comprobarlongitudarray(lista:Jugador[]){
      if(lista.length==0){
        return true;
      }else if(lista.length==1){
        return false;
      }else if(lista.length>1){
        return true;
      }
      return false;
    }
    /**
     * Metodo para guardar la alineacion y comprueba que se puede mandar si tiene un objeto o no
     */
    guardaralineacion(){
      if(this.del1.length==0 || this.del2.length==0 || this.del3.length==0 || this.mid1.length==0
        || this.mid2.length==0 || this.mid3.length==0 || this.mid4.length==0 || this.def1.length==0
        || this.def2.length==0 || this.def3.length==0 || this.por.length==0){
          this.messageService.add({severity:'error', detail:'Aun no esta completa la alineación', life:1500});
      }else{
        let listaalineacion:Jugador[]=[];
        listaalineacion.push(this.del1[0]);
        listaalineacion.push(this.del2[0]);
        listaalineacion.push(this.del3[0]);
        listaalineacion.push(this.mid1[0]);
        listaalineacion.push(this.mid2[0]);
        listaalineacion.push(this.mid3[0]);
        listaalineacion.push(this.mid4[0]);
        listaalineacion.push(this.def1[0]);
        listaalineacion.push(this.def2[0]);
        listaalineacion.push(this.def3[0]);
        listaalineacion.push(this.por[0]);
        let alineacion:Alineacion={
          idpartido: 0,
          listajugador: listaalineacion
        };
        let indicevictoria=0;
        for (let index = 0; index < listaalineacion.length; index++) {
          let jugador:Jugador=listaalineacion[index]
          indicevictoria=jugador.indiceVictoria+indicevictoria
        }
        this.servicioEquipo.alinearEquipo(alineacion,this.idjornada,this.idpartido)
        .subscribe({
          next: (() =>{
            this.messageService.add({severity:'success',summary:'Alineacion guardada con exito', detail:'Porcentaje de victoria: '+indicevictoria.toFixed(2)+" %", life:2000});
          }),
          error: err=>{
            this.messageService.add({severity:'error', detail:'Te faltan jugadores para completar la alineacion', life:1500});
          }
        })
      }
    }
}
