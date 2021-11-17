


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
    TagsService,
    CodigosDescuentosService,
    ExcelService
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
        SubcategoriasService,
        CategoriasService,
        TagsService,
        CodigosDescuentosService,
        ExcelService
    ],
    entryComponents: [
        
    ]
})
export class ServicesModule { }


