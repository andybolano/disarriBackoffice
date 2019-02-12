import { ventasComponent } from './views/ventas/ventas.component';
import { clientesComponent } from './views/clientes/clientes.component';
import { bannerComponent } from './views/banner/banner.component';
import { configuracionComponent } from './views/configuracion/configuracion.component';
import { coleccionComponent } from './views/colecciones/colecciones.component';
import { productosComponent } from './views/productos/productos.component';
import { Routes } from "@angular/router";




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
      { path: 'productos', component: productosComponent },
      { path: 'coleccion', component: coleccionComponent },
      { path: 'configuracion', component: configuracionComponent },
      { path: 'banner', component: bannerComponent },
      { path: 'clientes', component: clientesComponent },
      { path: 'ventas', component: ventasComponent },
    ]
  },
  {
    path: '', component: blankComponent,
    children: [
      { path: 'login', component: loginComponent }
    ]
  },

  // Handle all other routes
  { path: '**', component: productosComponent }
];
