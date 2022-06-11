import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MenuItem, MessageService, PrimeNGConfig } from 'primeng/api';
import { AuthResponse, MensajeResponse } from 'src/app/interfaces/interface';
import { BuzonService } from 'src/app/services/buzon.service';
import { UserSubjectNavbarService } from 'src/app/services/user-subject-navbar.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.css'],
  providers:[MessageService]
})
/**
 * Clase del componente Mensajes
 */
export class MensajesComponent implements OnInit {
//Atributos
  id!:number;
  nombreUsuario!:string;
  userDetails!: AuthResponse | null;
  listMensajes!:MensajeResponse[];
  items:MenuItem[]=[];
  mensajeDetails!:string;
  asuntoMensaje!:string;
  mostrar:boolean=false;

  dialogDetails!:boolean;
  dialogFAQ!:boolean;
  listUsuarios:string[]=[];
  private jwt:JwtHelperService= new JwtHelperService();
  constructor(private primengConfig: PrimeNGConfig, private servicioBuzon:BuzonService,
    private messageService: MessageService, private servicioUser:UsuarioService,
    private userSubject:UserSubjectNavbarService,
    private router:Router) {
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
    this.items = [
      {
          label: 'Opciones',
          items: [{
              label: 'Volver a atrás',
              icon: 'pi pi-angle-double-left',
              command: () => {
                  this.goBack();
              }
          }
      ]}]

    this.primengConfig.ripple = true;
    this.obtenerMensajesUser();
  }
/**
 * Metodo para obtener todos los mensajes del usuario
 */

  obtenerMensajesUser(){
    this.id=this.servicioUser.obtenerIdUsuario();
    this.nombreUsuario=this.servicioUser.obtenerNombreUsuario();
    this.servicioBuzon.obtenerMensajesUser(this.id).subscribe({
      next:(resp=>{
        this.listMensajes=resp;
        for(let i=0;i<this.listMensajes.length;i++){
          this.listUsuarios.push(this.listMensajes[i].nombreEmisor);
        }
        this.mostrar=true;
      }),
      error:(err=>{
        this.messageService.add({severity:'warn', summary: 'Error', detail: err.error.mensaje});
      })
    })
  }

      /**
 * Filtrado de la tabla PrimeNG
 * @param $event
 * @param stringVal
 * @param dt
 */
       applyFilterGlobal($event: any, stringVal: any,  dt: any) {
        dt!.filterGlobal(($event.target as HTMLInputElement).value, 'contains');
      }


      goBack(){
        this.router.navigate(["./buzon"]);

      }


      formatTextMensajeria(mensaje:string){
        let mensajeFormatted:string="";
        let cont:number=0;
        if(mensaje.length>50){
          while(mensajeFormatted.length<40){
            mensajeFormatted+=mensaje[cont];
            cont++;
          }
          mensajeFormatted+= " ...";
        }else{
          mensajeFormatted=mensaje;
        }
        return mensajeFormatted;
      }


      detallesMensaje(mensaje:string,asunto:string){
        this.mensajeDetails=mensaje;
        this.asuntoMensaje=asunto;
        this.dialogDetails=true;
      }
}
