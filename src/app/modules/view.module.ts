import { ventasComponent } from './../views/ventas/ventas.component';
import { clientesComponent } from './../views/clientes/clientes.component';
import { bannerComponent } from './../views/banner/banner.component';
import { configuracionComponent } from './../views/configuracion/configuracion.component';
import { coleccionComponent } from './../views/colecciones/colecciones.component';
import { blogComponent } from './../views/blog/blog.component';
import { productosComponent } from './../views/productos/productos.component';
import { pluginsModule } from './plugins.module';
import { mainViewComponent } from './../views/main-view/main-view.component';
import { loginComponent } from './../views/login/login.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PipesModule } from './pipes.module';
import { AboutComponent } from '../views/about/about.component';
import { ContactoComponent } from '../views/contacto/contacto.component';
import { TiendasComponent } from '../views/tiendas/tiendas.component';
import { CategoriasComponent } from '../views/categorias/categorias.component';
import { TagsComponent } from '../views/tags/tag.component';
import { SubcategoriasComponent } from '../views/subcategorias/subcategorias.component';
import { CodigosDescuentosComponent } from '../views/codigos-descuento/codigos-descuento.component';

@NgModule({
    imports: [
        FormsModule, CommonModule,  PipesModule, pluginsModule
    ],
    declarations: [
         // Views
        loginComponent,
        mainViewComponent,
        productosComponent,
        blogComponent,
        coleccionComponent,
        configuracionComponent,
        bannerComponent,
        clientesComponent,
        ventasComponent,
        AboutComponent,
        ContactoComponent,
        TiendasComponent,
        CategoriasComponent,
        SubcategoriasComponent,
        TagsComponent,
        CodigosDescuentosComponent
    ],
    providers: [],
})
export class viewsModule { }