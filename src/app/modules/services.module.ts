import { 
    AlertService, 
    AuthenticationService ,
    RetirosService, 
    HttpCacheService, 
    ServersService,
    PerfilesService,
    FranquiciasService,
    GruposService,
    UsuariosService,
    RecargasService,
    VentasService,
    MercadosService,
    EncuentrosService,
} from './../services/base.import';
import { NgModule } from '@angular/core';
import {ToastyModule} from 'ng2-toasty';


@NgModule({
    imports: [ToastyModule.forRoot()],
    providers: [
        ServersService,
        HttpCacheService,
        RetirosService, 
        AlertService, 
        AuthenticationService,
        PerfilesService,
        FranquiciasService,
        GruposService,
        UsuariosService,
        RecargasService,
        VentasService,
        MercadosService,
        EncuentrosService
    ]
})
export class ServicesModule { }