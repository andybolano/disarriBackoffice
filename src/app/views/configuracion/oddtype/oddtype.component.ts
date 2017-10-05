import { Component, OnInit } from '@angular/core';
import { Result } from './../../../services/servers.service';
import { AlertService, MercadosService } from "../../../services/base.import";
import { loading_show, loading_hide } from '../../../app.helpers';
declare var jQuery: any;

@Component({
    selector: 'addtypes',
    templateUrl: 'oddtype.template.html'
})
export class oddtypes_component implements OnInit {
    constructor(private mercadosService: MercadosService, private alertService: AlertService) { }
    ngOnInit() {
        this.getMercados();
    }

    public filter = "";
    public mercados = [];

    getMercados() {
        loading_show();
        this.mercadosService.getMercado((data: Result) => {
            loading_hide();
            if (data.isOk) {
                this.mercados = data.Content;
            }
        });
    }

    saveMercado(item:any){
    loading_show();
        this.mercadosService.updateMercado(item,(data: Result) => {
            loading_hide();
            if (data.isOk) {
                  this.alertService.success('Actualizado Correctamente');
            }
        });
    }
}