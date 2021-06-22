

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
    TiendasService
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
        TiendasService

    ]
})
export class ServicesModule { }


