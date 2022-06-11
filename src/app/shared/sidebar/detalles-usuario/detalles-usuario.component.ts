import { Component, Input, OnInit } from '@angular/core';
import { Equipo, LigaJornadas } from 'src/app/interfaces/interface';
import { EquipoService } from 'src/app/services/equipo.service';
import { LigaService } from 'src/app/services/liga.service';
import { UserSubjectNavbarService } from 'src/app/services/user-subject-navbar.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-detalles-usuario',
  templateUrl: './detalles-usuario.component.html',
  styleUrls: ['./detalles-usuario.component.css']
})
export class DetallesUsuarioComponent implements OnInit {
  equipoName!: string | null;
  rol!:string;
  equipo!:Equipo;
  miembros!:number;
  liga!:LigaJornadas;
  ligaParticipantes!:LigaJornadas | null;
  presupuesto!:number |null;
  show:boolean=false;
  @Input() childMessage: string | undefined;
  constructor(private serviceEquipo:EquipoService,private serviceLiga:LigaService,
    private serviceUsuario:UsuarioService,private userSubject:UserSubjectNavbarService) {
      this.userSubject.equipoName$.subscribe(data => setTimeout(() => this.equipoName = data, 0));
      this.userSubject.liga$.subscribe(data => setTimeout(() => this.ligaParticipantes = data, 0));
      this.userSubject.presupuesto$.subscribe(data => setTimeout(() => this.presupuesto = data, 0));
     }

  ngOnInit(): void {
    this.obtenerRol();
  }

  obtenerRol(){
    this.rol=this.serviceUsuario.obtenerRol();
    if(this.rol=='Admitido'){
      this.serviceEquipo.obtenerEquipo().subscribe({
        next:(resp=>{
          this.equipo=resp;
          this.serviceLiga.obtenerLigas().subscribe({
            next:(resp=>{
              this.liga=resp;
              this.show=true;
            })
          })
        })
      })
    }else if(this.rol=='ADMIN'){
      this.serviceLiga.obtenerLigas().subscribe({
        next:(resp=>{
          this.liga=resp;
          this.miembros=this.liga.equipos.length;
          this.show=true;
        })
      })
    }
  }

  obtenerMiembros():number{
    return this.ligaParticipantes!.equipos.length;
  }

}
