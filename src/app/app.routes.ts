import { eliminar_component } from './views/procesos/eliminar/eliminar.component';
import { pago_component } from './views/procesos/pago/pago.component';
import { encuentros_component } from './views/configuracion/encuentros/encuentros.component';
import { oddtypes_component } from './views/configuracion/oddtype/oddtype.component';
import { tickets_component } from './views/reportes/ventas/tickets.component';
import { ventasbyGrupo_component } from './views/reportes/ventas/byGrupo.component';
import { ventas_component } from './views/reportes/ventas/ventas.component';
import { perfilesComponent } from './views/perfiles/perfiles.component';
import { clientesComponent } from './views/clientes/clientes.component';
import { usuarios_actualizar_component } from './views/usuarios/actualizar/usuarios.actualizar.component';
import { geotaquillas_component } from './views/geotaquillas/geotaquila.component';
import { grupos_component } from './views/grupos/grupo.component';
import { franquiciasComponent } from './views/franquicias/franquicias.component';
import { usuarios_consultar_component } from './views/usuarios/consultar/usuarios.consultar.component';
import { taquilleros_crear_component } from './views/usuarios/crear/taquilleros.crear.component';
import { usuarios_crear_component } from './views/usuarios/crear/usuarios.crear.component';
import { Routes } from "@angular/router";
import { mainViewComponent } from "./views/main-view/main-view.component";
import { recargas_solicitudes_component } from "./views/recargas/solicitudes/recargas.solicitudes.component";
import { recargas_historial_component } from "./views/recargas/historial/recargas.historial.component";
import { retiros_solicitudes_component } from "./views/retiros/solicitudes/retiros.solicitudes.component";
import { retiros_historial_component } from "./views/retiros/historial/retiros.historial.component";


/*import { perfiles_crear_component } from './views/perfiles/crear/perfiles.crear.component';
import { perfiles_consultar_component } from './views/perfiles/consultar/perfiles.consultar.component';*/

import { loginComponent } from "./views/login/login.component";
import { blankComponent } from "./components/common/layouts/blank.component";
import { basicComponent } from "./components/common/layouts/basic.component";


export const ROUTES: Routes = [
  // Main redirect
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // App views
  {
    path: '', component: basicComponent,
    children: [
      { path: 'mainView', component: mainViewComponent },
      { path: 'franquicias', component: franquiciasComponent },
       { path: 'grupos', component: grupos_component },
       { path: 'clientes', component: clientesComponent},
       {
        path: 'reportes', children: [
          { path: 'ventas', component: ventas_component },
          { path: 'ventas/byGrupo', component: ventasbyGrupo_component },
          { path: 'ventas/tickets', component: tickets_component },
        ]
      },
      {
        path: 'configuracion', children: [
          { path: 'oddtypes', component: oddtypes_component },
          {path: 'encuentros', component: encuentros_component}
        ]
      },
      {
        path: 'usuarios', children: [
          { path: 'crear', component: usuarios_crear_component },
          { path: 'crear/taquilleros', component: taquilleros_crear_component },
          { path: 'consultar', component: usuarios_consultar_component },
          { path: 'actualizar', component: usuarios_actualizar_component },
        ]
      },
       { path: 'perfiles', component: perfilesComponent},
      {
        path: 'recargas', children: [
          { path: 'solicitudes', component: recargas_solicitudes_component },
          { path: 'historial', component: recargas_historial_component },
        ]
      },
      {
        path: 'retiros', children: [
          { path: 'solicitudes', component: retiros_solicitudes_component },
          { path: 'historial', component: retiros_historial_component },
        ]
      },
       {
        path: 'procesos', children: [
           { path: 'pago', component: pago_component },
            { path: 'eliminar', component: eliminar_component },
        ]
      },
       
       { path: 'geotaquillas', component: geotaquillas_component },

    ]
  },
  {
    path: '', component: blankComponent,
    children: [
      { path: 'login', component: loginComponent }
    ]
  },

  // Handle all other routes
  { path: '**', component: mainViewComponent }
];
