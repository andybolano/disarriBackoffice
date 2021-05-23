import { viewsModule } from './../../modules/view.module';

import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { AlertService, ConfiguracionService } from "../../services/base.import";
import { Result } from './../../services/servers.service';
import { loading_show, loading_hide } from '../../app.helpers';
import swal from 'sweetalert2';
declare var jQuery: any;
@Component({
    selector: 'configuracionComponent',
    templateUrl: 'configuracion.template.html'
})
export class configuracionComponent {

    constructor(
        private configuracionService: ConfiguracionService,
        private alertService: AlertService
    ) {

    }

    public User = {
        id: 0,
        usuario: "",
        clave: "",
        pass: "",
        email: "",
        passNueva: "",
        envioCO: 0,
        envioCO_usd: 0,
        envioIN: 0,
        envioIN_usd: 0,
        envioBO: 0,
        envioBO_usd: 0,
        valor_min_cop: 0,
        valor_min_usd: 0
    };

    ngOnInit() {
        this.get();
    }

    get() {
        this.User = JSON.parse(localStorage.getItem('auth_item'));
    }

    update() {

        if (this.User.usuario == " ") {
            this.alertService.warning('Ingresar usuario');
            return;
        }

        if (this.User.email == " ") {
            this.alertService.warning('Ingresar email');
            return;
        }

        if (this.User.pass == "" || !this.User.pass) {
            this.alertService.warning('Ingresar contraseña');
            return;
        }

        if (this.User.passNueva == "" || !this.User.passNueva) {
            this.User.passNueva = "false";
        }
        loading_show()
        this.configuracionService.update(this.User, (data: Result) => {
            loading_hide();
            if (data.isOk) {
                this.alertService.success(data.Mensaje);
                localStorage.setItem('auth_item', JSON.stringify(data.Content));
                this.User.passNueva = "";
                this.User.pass = "";
            } else {
                this.alertService.error(data.Mensaje);
            }

        });

    }

}