import { viewsModule } from './../../modules/view.module';

import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { AlertService, ClientesService } from "../../services/base.import";
import { Result } from './../../services/servers.service';
import { loading_show, loading_hide } from '../../app.helpers';
import swal from 'sweetalert2';
declare var jQuery: any;
@Component({
    selector: 'clientesComponent',
    templateUrl: 'clientes.template.html'
})
export class clientesComponent {
    constructor(
        private alertService: AlertService,
        private clientesService: ClientesService
    ) {

    }

    public clientes = [];
    public filter="";

    ngOnInit() {
       this.getAll();
    }

    getAll(){
         loading_show();
            this.clientesService.getAll((data: Result) => {
                loading_hide();
                if (data.isOk) {
                    this.clientes = data.Content;
                } else {
                    this.alertService.error(data.Mensaje);
                }
            });
    }
}