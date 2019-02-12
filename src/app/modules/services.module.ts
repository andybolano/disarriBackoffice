

import { 
    AlertService, 
    AuthenticationService ,
    ProductosService, 
    HttpCacheService, 
    ServersService,
     BlogService,
     ColeccionService,
     ConfiguracionService,
     BannerService,
      ClientesService,
      VentasService
} from './../services/base.import';
import { NgModule } from '@angular/core';
import {ToastyModule} from 'ng2-toasty';


@NgModule({
    imports: [ToastyModule.forRoot()],
    providers: [
        ServersService,
        HttpCacheService,
        ProductosService, 
        AlertService, 
        AuthenticationService,
        BlogService,
        ColeccionService,
        ConfiguracionService,
        BannerService,
        ClientesService,
        VentasService
  
    ]
})
export class ServicesModule { }


