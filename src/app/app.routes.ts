import { ventasComponent } from './views/ventas/ventas.component';
import { clientesComponent } from './views/clientes/clientes.component';
import { bannerComponent } from './views/banner/banner.component';
import { configuracionComponent } from './views/configuracion/configuracion.component';
import { coleccionComponent } from './views/colecciones/colecciones.component';
import { blogComponent } from './views/blog/blog.component';
import { productosComponent } from './views/productos/productos.component';
import { Routes } from "@angular/router";
import { mainViewComponent } from "./views/main-view/main-view.component";




import { loginComponent } from "./views/login/login.component";
import { blankComponent } from "./components/common/layouts/blank.component";
import { basicComponent } from "./components/common/layouts/basic.component";
import { AboutComponent } from './views/about/about.component';
import { ContactoComponent } from './views/contacto/contacto.component';
import { TiendasComponent } from './views/tiendas/tiendas.component';


export const ROUTES: Routes = [
  // Main redirect
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // App views
  {
    path: '', component: basicComponent,
    children: [
      { path: 'mainView', component: mainViewComponent },
      { path: 'productos', component: productosComponent },
      { path: 'blog', component: blogComponent },
      { path: 'coleccion', component: coleccionComponent },
      { path: 'configuracion', component: configuracionComponent },
      { path: 'banner', component: bannerComponent },
      { path: 'clientes', component: clientesComponent },
      { path: 'ventas', component: ventasComponent },
      { path: 'about', component: AboutComponent },
      { path: 'contact', component: ContactoComponent },
      { path: 'tiendas', component: TiendasComponent },
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
