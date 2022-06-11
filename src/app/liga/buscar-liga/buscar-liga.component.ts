import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { AuthResponse, Ligas} from 'src/app/interfaces/interface';
import { LigaService } from 'src/app/services/liga.service';
import { UserSubjectNavbarService } from 'src/app/services/user-subject-navbar.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-buscar-liga',
  templateUrl: './buscar-liga.component.html',
  styleUrls: ['./buscar-liga.component.css'],
  providers:[MessageService]
})
/**
 * Componente para buscar las ligas
 */
export class BuscarLigaComponent implements OnInit {
  //Atributos
  private jwt:JwtHelperService= new JwtHelperService();
  userDetails!: AuthResponse | null;
  listadeligas:Ligas[]=[];
  opcionesDataTables: DataTables.Settings={}
  triggerDatatables:Subject<any> = new Subject<any>();
  isEmpty:boolean = true;
  //Constructor
  constructor(private servicioliga: LigaService,private router:Router,
    private userSubject:UserSubjectNavbarService,
    private servicioUsuario:UsuarioService,
    private messageService: MessageService) {
      this.userSubject.userDetails$.subscribe(data => setTimeout(() => this.userDetails = data, 0));
    }
  /**
   * NgOnInit con el método para cargar todas las ligas abiertas
   * y configuracion para la datatable
   */
    ngOnInit(): void {
      let token = this.servicioUsuario.getToken();
    if (token != null) {
      this.userDetails = this.jwt.decodeToken(
        JSON.stringify(token)
      );
      this.userSubject.changeNavBar(this.userDetails);
    }
      this.cargarLigas();
      this.opcionesDataTables={
        pagingType:'full_numbers',
        pageLength:10,
        language:{
          url:"http://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json"
        }
      }
    }
    /**
     * Método para cargarLigas llamando al servicio de la liga y pide las ligas,
     * una vez obtenidas, las introduce en la lista de ligas para mostrarse en la datatable
     */
    cargarLigas(){
      this.servicioliga.obtenerLigas().subscribe({
        next:(resp)=> {
          this.listadeligas=resp;
          if(this.listadeligas==null){
            this.messageService.add({severity:'info',detail:'No hay ligas disponibles', life:1500});
          }
          else{
            this.triggerDatatables.next(null);
          }
        }
      })
    }
    /**
     * Método para enviar la solicitud para unirse una liga
     * @param liganombre nombre de la liga a la que el usuario solicita unirse a la liga.
     */
    enviarSolicitud(liganombre:string){
      this.servicioliga.enviarSolicitud(liganombre).subscribe({
        next:(()=>{
          this.messageService.add({severity:'success',detail:'Solicitud enviada', life:1500});
        }),
        error:(err=>{
          this.messageService.add({severity:'error',detail:err.error.mensaje, life:1500});
        })

      })
    }
}
