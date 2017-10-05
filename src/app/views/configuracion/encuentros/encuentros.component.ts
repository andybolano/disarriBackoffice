import { Component, OnInit } from '@angular/core';
import { Result } from './../../../services/servers.service';
import { AlertService, EncuentrosService } from "../../../services/base.import";
import { loading_show, loading_hide } from '../../../app.helpers';
declare var jQuery: any;

@Component({
    selector: 'encuentros',
    templateUrl: 'encuentros.template.html'
})
export class encuentros_component implements OnInit {
    constructor(private encuentrosService: EncuentrosService, private alertService: AlertService) { }
     ngOnInit() {
        let fecha = new Date();
        this.fechaDesde = fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate();
        this.fechaHasta = fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate();
        this.getEncuentros();
    }
public filter = "";    
public encuentros = [];
public fechaDesde: String;
public fechaHasta: String;

    onChangeFechaDesde(value) {
        this.fechaDesde = value;
        this.getEncuentros();
    }

    onChangeFechaHasta(value) {
        this.fechaHasta = value;
        this.getEncuentros();
    }
    

    getEncuentros() {
        loading_show();
        this.encuentrosService.getAll(this.fechaDesde,this.fechaHasta,(data: Result) => {
            loading_hide();
            console.log(data)
            if (data.isOk) {
                this.encuentros = data.Content;
            }
        });
    }

    
}