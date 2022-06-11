import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AdministrarfinanzasModule } from './administrarfinanzas/administrarfinanzas.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BuzonModule } from './buzon/buzon.module';
import { ControlAccesoModule } from './control-acceso/control-acceso.module';
import { CrearmensajecomunidadModule } from './crearmensajecomunidad/crearmensajecomunidad.module';
import { EquipoModule } from './equipo/equipo.module';
import { LigaModule } from './liga/liga.module';
import { MensajecomunidadModule } from './mensajecomunidad/mensajecomunidad.module';
import { SidebarModule } from './shared/sidebar/sidebar.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlineacionmoduloModule } from './alineacionmodulo/alineacionmodulo.module';
import { JornadaModule } from './jornada/jornada.module';
import { ClasificacionModule } from './clasificacion/clasificacion.module';
import { UsuarioModule } from './usuario/usuario.module';
import { ConfirmationService } from 'primeng/api';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { UserSubjectNavbarService } from './services/user-subject-navbar.service';

@NgModule({
  declarations: [
    AppComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SidebarModule,
    ControlAccesoModule,
    LigaModule,
    AdministrarfinanzasModule,
    CrearmensajecomunidadModule,
    BuzonModule,
    MensajecomunidadModule,
    EquipoModule,
    JornadaModule,
    BrowserAnimationsModule,
    AlineacionmoduloModule,
    ClasificacionModule,
    UsuarioModule
  ],
  providers: [ConfirmationService,UserSubjectNavbarService,{provide: JWT_OPTIONS, useValue: JWT_OPTIONS},JwtHelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
