import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MenuItem, MessageService } from 'primeng/api';
import {  AuthResponse, LigaDTO,  } from 'src/app/interfaces/interface';
import { ControlAccesoService } from 'src/app/services/control-acceso.service';
import { LigaService } from 'src/app/services/liga.service';
import { UserSubjectNavbarService } from 'src/app/services/user-subject-navbar.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  providers:[MessageService],
  styleUrls: ['./sidebar.component.css'],
})
/**
 * Componente de la barra lateral
 */
export class SidebarComponent implements OnInit {
  //Atributos
  displayFinder:boolean=false;
  displayFinderEquipo:boolean=false;
  opcionesLiga!:any[];
  ocpionesEquipo!:any[];
  dockItems!: MenuItem[];
  dockItemsSinLiga!: MenuItem[];
  dockItemsAdmin!: MenuItem[];
  dockItemsAdmitido!: MenuItem[];
  userDetails!: AuthResponse | null;
  userName!: string | null;
  private jwt:JwtHelperService= new JwtHelperService();
  rol:string=this.controlacceso.rol;
  mostrarinfo:boolean=false;
  liga!:string;
  liguita:LigaDTO={
    nombre: '',
    miembros: 0,
    nombreAdmin: ''
  }


//Constructor
  constructor(private router:Router,
    private controlacceso:ControlAccesoService,
    private servicioliga:LigaService,
    private userSubject:UserSubjectNavbarService,
    private messageService: MessageService) {
      this.userSubject.userDetails$.subscribe(data => setTimeout(() => this.userDetails = data, 0));
      this.userSubject.userName$.subscribe(data => setTimeout(() => this.userName = data, 0));
    }
/**
 * ngOnInit que obtiene el rol y el nombre de usuario en caso de tenerlo y lo guarda en un servicio
 */
  ngOnInit(): void {
    this.dockItems = [
      {
          label: 'Login',
          icon: "assets/img/login.png",
          routerLink: ['/login']
      },
      {
        label: 'Registro',
        icon: "assets/img/registrationn.png",
        routerLink: ['/registro']
      },
      {
        label: 'Contacto',
        icon: "assets/img/contacto.png",
        routerLink: ['/contacto']
      }
  ];

    this.dockItemsSinLiga=[

      {
        label:'Buscar_Liga',
        icon:"assets/img/lupa.png",
        routerLink:['/buscarliga']

      },
      {
        label: 'Contacto',
        icon: "assets/img/contacto.png",
        routerLink: ['/contacto']
      }

    ];


    this.dockItemsAdmin=[
      {
        label:'Comunidad',
        icon:"assets/img/comunidad.png",
        routerLink: ['/crearmensajecomunidad']
      },
      {
        label: 'Liga',
        icon: "assets/img/balon.png",
      },
      {
        label:'Ver jornadas',
        icon: "assets/img/calendario.png",
        routerLink: ['/jornada']
      },
      {
        label: 'Contacto',
        icon: "assets/img/contacto.png",
        routerLink: ['/contacto']
      }
    ];

    this.opcionesLiga=[
          {
            label: 'Crear liga',
            icon: 'pi pi-plus',
            routerLink: ['/crear-liga']
          },
          {
            label: 'Iniciar liga',
            icon: 'pi pi-angle-double-right',
            command: () => {
              this.iniciarLiga();
          }
          },
          {
            label: 'Administrar liga',
            icon: 'pi pi-briefcase',
            routerLink: ['/administrar-liga']
          },
          {
            label: 'Administrar finanzas',
            icon: 'pi pi-dollar',
            routerLink: ['/administrarfinanzas']
          }
    ];

    this.dockItemsAdmitido=[
      {
        label:'Mensaje',
        icon:"assets/img/comunidad.png",
        routerLink:['/mensajescomunidad']
      },
      {
        label:'Equipo',
        icon:"assets/img/equipo.png"
      },
      {
        label:'Clasificacion',
        icon:"assets/img/ranking.png",
        routerLink:['/clasificacion']
      },
      {
        label:'Mercado',
        icon:"assets/img/transfer.png",
        routerLink:['/mercado']
      },
      {
        label: 'Contacto',
        icon: "assets/img/contacto.png",
        routerLink: ['/contacto']
      }

    ];

    this.ocpionesEquipo=[
      {
        label:'Editar equipo',
        icon:'pi pi-pencil',
        routerLink: ['/equipo']
      },
      {
        label:'Jugadores',
        icon:'pi pi-bars',
        routerLink: ['/ver-jugadores']
      },
      {
        label:'Partidos',
        icon:'pi pi-bars',
        routerLink: ['/verpartidos']
      }
    ]

  }

  iniciarLiga(){
    this.servicioliga.iniciarLiga(this.liguita).subscribe({
      next:(()=>{
        this.messageService.add({severity:'success',detail:'Liga Iniciada', life:1500});
      }),
      error:(err=>{
        this.messageService.add({severity:'error',detail:err.error.mensaje, life:1500});
      })
    })

  }




/**
 * Metodo para cerrar la sesion eliminando el rol guardado aqui y en el servicio.
 */
  cerrarSesion(){

    if (localStorage.getItem('token')!=null){
      this.userSubject.changeNavBarNull();
      this.rol='';
      this.controlacceso.guardarRol(this.rol);
    }else{
      this.messageService.add({severity:'info',detail:'No hay ninguna sesión activa', life:1500});
    }
    localStorage.clear();
    this.router.navigateByUrl('/home')
  }


  abrirMenuLiga(){
    this.displayFinder = !this.displayFinder;
  }

  abrirMenuEquipo(){
    this.displayFinderEquipo=!this.displayFinderEquipo;
  }


}
