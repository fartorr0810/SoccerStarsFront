import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidebarRoutingModule } from './sidebar-routing.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ToastModule } from 'primeng/toast';
import { DetallesUsuarioComponent } from './detalles-usuario/detalles-usuario.component';
import {DockModule} from 'primeng/dock';
import { MenuModule } from 'primeng/menu';
import { DialogModule } from 'primeng/dialog';
import {TreeModule} from 'primeng/tree';
import { MenubarModule } from 'primeng/menubar';

@NgModule({
  declarations: [
    SidebarComponent,
    DetallesUsuarioComponent
  ],
  imports: [
    CommonModule,
    SidebarRoutingModule,
    ToastModule,
    DockModule,
    MenuModule,
    DialogModule,
    TreeModule,
    MenubarModule
  ],
  exports: [
    SidebarComponent
  ]
})
export class SidebarModule { }
