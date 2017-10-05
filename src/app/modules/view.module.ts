import { eliminar_component } from './../views/procesos/eliminar/eliminar.component';
import { pago_component } from './../views/procesos/pago/pago.component';
import { encuentros_component } from './../views/configuracion/encuentros/encuentros.component';
import { oddtypes_component } from './../views/configuracion/oddtype/oddtype.component';
import { tickets_component } from './../views/reportes/ventas/tickets.component';
import { ventasbyGrupo_component } from './../views/reportes/ventas/byGrupo.component';
import { ventas_component } from './../views/reportes/ventas/ventas.component';
import { perfilesComponent } from './../views/perfiles/perfiles.component';
import { clientesComponent } from './../views/clientes/clientes.component';
import { usuarios_actualizar_component } from './../views/usuarios/actualizar/usuarios.actualizar.component';
import { geotaquillas_component } from './../views/geotaquillas/geotaquila.component';

import { pluginsModule } from './plugins.module';
import { grupos_component } from './../views/grupos/grupo.component';
import { franquiciasComponent } from './../views/franquicias/franquicias.component';

import { taquilleros_crear_component } from './../views/usuarios/crear/taquilleros.crear.component';
import { usuarios_consultar_component } from './../views/usuarios/consultar/usuarios.consultar.component';
import { usuarios_crear_component } from './../views/usuarios/crear/usuarios.crear.component';

import { recargas_solicitudes_component } from './../views/recargas/solicitudes/recargas.solicitudes.component';
import { retiros_solicitudes_component } from './../views/retiros/solicitudes/retiros.solicitudes.component';

import { perfiles_crear_component } from './../views/perfiles/crear/perfiles.crear.component';
import { perfiles_consultar_component } from './../views/perfiles/consultar/perfiles.consultar.component';

import { retiros_historial_component } from './../views/retiros/historial/retiros.historial.component';
import { recargas_historial_component } from './../views/recargas/historial/recargas.historial.component';
import { mainViewComponent } from './../views/main-view/main-view.component';
import { loginComponent } from './../views/login/login.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PipesModule } from './pipes.module';

@NgModule({
    imports: [
        FormsModule, CommonModule,  PipesModule, pluginsModule
    ],
    declarations: [
         // Views
        loginComponent,
        mainViewComponent,
        clientesComponent,
        recargas_historial_component,
        recargas_solicitudes_component,

        //configuracion
        oddtypes_component,
        encuentros_component,

        //reportes
        ventas_component,
        ventasbyGrupo_component,
        tickets_component,

        retiros_historial_component,
        retiros_solicitudes_component,

        pago_component,
        eliminar_component,
        
        perfilesComponent,
        perfiles_consultar_component,
        perfiles_crear_component,

        franquiciasComponent,
        grupos_component,


        usuarios_consultar_component,
        usuarios_crear_component,
        usuarios_actualizar_component,
        taquilleros_crear_component,
        geotaquillas_component
    ],
    providers: [],
})
export class viewsModule { }