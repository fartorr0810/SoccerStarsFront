import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { of, Subject } from 'rxjs';
import {  AuthResponse, MensajeUser, Notificacion, UsuarioResponse } from 'src/app/interfaces/interface';
import { BuzonService } from 'src/app/services/buzon.service';
import { EquipoService } from 'src/app/services/equipo.service';
import { LigaService } from 'src/app/services/liga.service';
import { UserSubjectNavbarService } from 'src/app/services/user-subject-navbar.service';
import { UsuarioService } from 'src/app/services/usuario.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-buzon',
  templateUrl: './buzon.component.html',
  styleUrls:['./buzon.component.css'],
  providers:[MessageService]
})
/**
 * Componente del buzon
 */
export class BuzonComponent implements OnInit {

  //Atributos
  private jwt:JwtHelperService= new JwtHelperService();
  userDetails!: AuthResponse | null;
  rol!:string;
  usuarios:UsuarioResponse[]=[];
  usuarioRespuesta!:UsuarioResponse;
  mostrarFormulario:boolean=false;
  mostrarFormularioRespuesta:boolean=false;
  dialog!:boolean;
  dialogResp!:boolean;
  dialogDetails!:boolean;
  mensajeDetails!:string;
  asuntoMensaje!:string;
  idUser!:number;
  formCorreo!: FormGroup;
  formCorreoRespuesta!:FormGroup;
  listademensajes:Notificacion[]=[];
  opcionesDataTables: DataTables.Settings={}
  triggerDatatables:Subject<any> = new Subject<any>();
  isEmpty:boolean = true;
  aceptar:boolean=true;
  rechazar:boolean=true;
  roll!:string;
  nickname!:string;
  //Constructor
  constructor(private serviciobuzon: BuzonService,private router:Router,
    private primengConfig: PrimeNGConfig,
    private formBuilder: FormBuilder,
    private servicioLiga:LigaService,
    private servicioUser:UsuarioService,
    private messageService: MessageService,
    private servicioEquipo:EquipoService,
    private userSubject:UserSubjectNavbarService) {
      this.userSubject.userDetails$.subscribe(data => setTimeout(() => this.userDetails = data, 0));
     }
/**
 * NgOnInit que llama al metodo de cargar mensajes, configura la datatable y nos subscribimos
 * a los parametros y los asignamos.
 */
    ngOnInit(): void {
      let token = this.servicioUser.getToken();
      if (token != null) {
        this.userDetails = this.jwt.decodeToken(
          JSON.stringify(token)
        );
        this.userSubject.changeNavBar(this.userDetails);
      }
      this.cargarUsuarios();
      this.cargarMensajes();
      this.obtenerDatosUsuarioLogueado();

      this.opcionesDataTables={
        pagingType:'full_numbers',
        pageLength:10,
        language:{
          url:"https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json"
        }
      }

      this.primengConfig.ripple = true;
    }
    /**
     * Metodo para dar respuesta a una solicitud de union a una liga. Mostrando la alerta
     * correspondiente a nuestra accion.
     * @param respuesta booleano con true si acepta y false si no acepta
     * @param idnotificacion id de la notificacion a la que se esta dando respuesta.
     */
    respuestaSolicitud(respuesta:boolean,idnotificacion:number){
      this.serviciobuzon.respuestaSolicitud(respuesta,idnotificacion).subscribe({
        next:(resp)=> {
          if (resp==true) {
            const index = this.listademensajes.map(jugador=> jugador.id).indexOf(idnotificacion);
            if(this.listademensajes[index].tipo=='Comprar'){
              this.servicioEquipo.obtenerEquipo().subscribe({
                next:(resp=>{
                  this.userSubject.rechargePresupuesto(resp.presupuesto);
                })
              })
            }else if(this.listademensajes[index].tipo=='unir'){
              this.servicioLiga.obtenerLigas().subscribe({
                next:(resp=>{
                  this.userSubject.rechargeMiembrosLiga(resp);
                })
              })
            }
            this.actualizarNotificaciones(idnotificacion);
            this.usuarios=[];
            this.cargarUsuarios();
            this.messageService.add({severity:'success', detail:'Solicitud aceptada', life:1500});
          }else{
            this.actualizarNotificaciones(idnotificacion);
            this.messageService.add({severity:'error', detail:'Solicitud denegada', life:1500});
            }
          },
          error:(err)=> {
            this.messageService.add({severity:'error', detail:err.error.mensaje, life:1500});
          }
      })
    }
    /**
     * Servicio para cargar todos los mensajes que tiene el usuario dentro.
     */
    cargarMensajes(){
      this.serviciobuzon.obtenerMensajes().subscribe({
        next:(resp)=> {
          this.listademensajes=resp;

          if(this.listademensajes.length==0){
            this.messageService.add({severity:'info', detail:'Bandeja vacía', life:2000});
          }
          else{
            this.triggerDatatables.next(null);
          }
        }
      })
    }
    /**
     * Metodo para eliminar un mensaje del buzon
     * @param numero mensaje que se va  eliminar.
     */
    eliminarMensaje(numero:number){
      this.serviciobuzon.eliminarMensaje(numero).subscribe({
        next:(resp)=> {
          if(resp){
            this.actualizarNotificaciones(numero);
            this.messageService.add({severity:'success', detail:'Mensaje eliminado', life:1500});
          }
        },error:(err)=> {
          Swal.fire({
            title: 'No se pudo eliminar',
            icon: 'error',
            confirmButtonText: 'Ok'
          });
          }
      })
    }
    /**
     * Actualizar notificaciones
     * @param id
     */
    actualizarNotificaciones(id:number){

      let pos:number=0;
      let encontrado:boolean=false;
      while(!encontrado){
        if(this.listademensajes[pos].id == id){
          this.listademensajes.splice(pos,1);
          encontrado=true;
        }else{
          pos++;
        }
      }

    }
/**
 * Metodo para cargar el formulario
 */

    cargarFormulario(){
      this.buildFormulario();
      this.mostrarFormulario=true;
      this.dialog=true;
    }
    /**
     * Metodo para cargar el formulario con la respuesta pasandole la notificacion
     */
    cargarFormularioRespuesta(noti:Notificacion){
      this.usuarioRespuesta=this.buscarUsuarioDestino(noti.emisor);
      this.buildFormularioRespuesta();
      this.mostrarFormularioRespuesta=true;
      this.dialogResp=true;
    }
    /**
     * Metodo para buscar el usuario destino pasandole el id del usuario
     * @returns
     */
    buscarUsuarioDestino(idUsuario:number):UsuarioResponse{
      let encontrado:boolean = false;
      let pos:number=0;
      while(!encontrado || pos<this.usuarios.length){
        if(this.usuarios[pos].id==idUsuario){
          this.usuarioRespuesta=this.usuarios[pos];
          encontrado=true;
        }
        pos++;
      }
      return this.usuarioRespuesta;
    }

/**
 * Metodo para construir el formulario
 */
  buildFormulario(){
    this.formCorreo=this.formBuilder.group({
        destino: ['',[Validators.required]],
        asunto:[,[Validators.required, Validators.minLength(5)]],
        mensaje: [,[Validators.required,Validators.maxLength(300)]]
    })
  }
  /**
   * Metodo para construir el formulario de respuesta
   */
  buildFormularioRespuesta(){
    this.formCorreoRespuesta=this.formBuilder.group({
      destino: [this.usuarioRespuesta.id,[Validators.required]],
      asunto:[,[Validators.required, Validators.minLength(5)]],
      mensaje: [,[Validators.required,Validators.maxLength(300)]]
    })
  }

   /**
   * Comprueba y muestra los errores de cada campo del formulario
   * @param field C
   * @returns
   */
    notValidField( campo: string ) {
      return this.formCorreo.get(campo)?.invalid
      && this.formCorreo.get(campo)?.touched;
    }

    notValidFieldRespuesta( campo: string ) {
      return this.formCorreoRespuesta.get(campo)?.invalid
      && this.formCorreoRespuesta.get(campo)?.touched;
    }
/**
 * METODOS PARA MOSTRAR LOS MENSAJES DE ERROR
 */
    get destinatarioErrorMsg(): string {

      const errors = this.formCorreo.get('destino')?.errors!;
      if ( errors['required'] ) {
        return 'Campo obligatorio';
      }
      return '';}

    get mensajeErrorMsg(): string {
      const errors = this.formCorreo.get('mensaje')?.errors!;
      if (errors['required']) {
        return 'Campo obligatorio';
      }else if(errors['minlength']){
        return "Mínimo 10 caracteres";

      }else if(errors['maxlength']){
        return "Máximo de 300 caracteres";

      }
      return '';
    }

    get mensajeErrorRespuestaMsg(): string {
      const errors = this.formCorreoRespuesta.get('mensaje')?.errors!;
      if (errors['required']) {
        return 'Campo obligatorio';
      }else if(errors['minlength']){
        return "Mínimo 10 caracteres";

      }else if(errors['maxlength']){
        return "Máximo de 300 caracteres";

      }
      return '';
    }



    get asuntoErrorMsg(): string {
      const errors = this.formCorreo.get('asunto')?.errors!;
      if (errors['required']) {
        return 'Campo obligatorio';
      }else if(errors['minlength']){
        return "Mínimo 5 caracteres"

      }else if(errors['maxlength']){
        return "Máximo de 30 caracteres";

      }
      return '';
    }

    get asuntoErrorRespuestaMsg(): string {
      const errors = this.formCorreoRespuesta.get('asunto')?.errors!;
      if (errors['required']) {
        return 'Campo obligatorio';
      }else if(errors['minlength']){
        return "Mínimo 5 caracteres"

      }else if(errors['maxlength']){
        return "Máximo de 30 caracteres";

      }
      return '';
    }



    obtenerDatosUsuarioLogueado(){
      this.idUser=this.servicioUser.obtenerIdUsuario();
      this.rol=this.servicioUser.obtenerRol();
    }

    cargarUsuarios(){
      if(this.rol!='USER SIN LIGA'){
        this.servicioLiga.obtenerLigas().subscribe({
          next:(resp=>{
            if(resp!=null){
              this.servicioLiga.obtenerUsuariosLiga(resp.id).subscribe({
                next:(resp=>{
                  this.actualizarUsuarios(resp);
                }),
                error:(err=>{
                  this.messageService.add({severity:'error', detail:err.error.mensaje, life:1500});
                })
              })
            }
          }),
          error:(err=>{
            this.messageService.add({severity:'error', detail:err.error.mensaje, life:1500});
          })
        })
      }
    }
    /**
     * Elimina nuestro usuario de la lista para que no nos podamos mandar mensajes a nosotros mismos
     */
    actualizarUsuarios(list:UsuarioResponse[]){
      list.forEach(usuario=>{
        if(usuario.id!=this.idUser){
          this.usuarios.push(usuario);
        }
      })
    }

    /**
     * Envía un correo a otro usuario de la misma liga
     */
    enviarcorreo(){
      let mensaje:MensajeUser=this.formCorreo.value;
      mensaje.emisor=this.idUser;
      mensaje.tipo='Mensajeria';
      mensaje.destino=this.formCorreo.get('destino')?.value;

      this.serviciobuzon.enviarMensajeUser(mensaje).subscribe({
        next:(()=>{
          this.messageService.add({severity:'success', detail:'Mensaje enviado', life:1500});
          this.dialog=false;
        }),
        error:(err=>{
          this.messageService.add({severity:'error', detail:err.error.mensaje, life:1500});
        })
      })
    }
/**
 * Metodo para enviar un correo con la respuesta
 */
    enviarcorreoRespuesta(){
      let mensaje:MensajeUser=this.formCorreoRespuesta.value;
      mensaje.emisor=this.idUser;
      mensaje.tipo='Mensajeria';
      mensaje.destino=this.formCorreoRespuesta.get('destino')?.value;

      this.serviciobuzon.enviarMensajeUser(mensaje).subscribe({
        next:(()=>{
          this.messageService.add({severity:'success', detail:'Mensaje enviado', life:1500});
          this.dialogResp=false;
        }),
        error:(err=>{
          this.messageService.add({severity:'error', detail:err.error.mensaje, life:1500});
        })
      })
    }
/**
 * Metodo para formatear el texto del mensaje
 * @param mensaje
 */
    formatTextMensajeria(mensaje:string){
      let mensajeFormatted:string="";
      let cont:number=0;
      if(mensaje.length>50){
        while(mensajeFormatted.length<50){
          mensajeFormatted+=mensaje[cont];
          cont++;
        }
        mensajeFormatted+= " ...";
      }else{
        mensajeFormatted=mensaje;
      }
      return mensajeFormatted;
    }
/**
 * Metodo para abrir los detalles del correo
 * @param mensaje
 * @param asunto
 */
    detallesCorreo(mensaje:string, asunto:string){
      this.asuntoMensaje=asunto;
      this.mensajeDetails=mensaje;
      this.dialogDetails=true;
    }
    /**
     *Metodo para obtener los correos
     */
    obtenerCorreos(){
      this.router.navigate(['/buzon/mensajes']);
    }

}
