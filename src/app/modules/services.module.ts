

import {
    AlertService,
    AuthenticationService,
    ProductosService,
    HttpCacheService,
    ServersService,
    BlogService,
    AboutService,
    ColeccionService,
    ConfiguracionService,
    BannerService,
    ClientesService,
    VentasService,
    ContactoService,
    TiendasService,
    CategoriasService,
    SubcategoriasService,
    TagsService
} from './../services/base.import';
import { NgModule } from '@angular/core';
import { ToastyModule } from 'ng2-toasty';


@NgModule({
    imports: [ToastyModule.forRoot()],
    providers: [
        ServersService,
        HttpCacheService,
        ProductosService,
        AlertService,
        AuthenticationService,
        BlogService,
        AboutService,
        ContactoService,
        ColeccionService,
        ConfiguracionService,
        BannerService,
        ClientesService,
        VentasService,
        TiendasService,
        CategoriasService,
        SubcategoriasService,
        TagsService
    ]
})
export class ServicesModule { }


