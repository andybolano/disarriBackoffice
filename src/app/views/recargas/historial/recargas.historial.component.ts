import { Result } from './../../../services/servers.service';
import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import swal from 'sweetalert2';
import { AlertService, RecargasService } from "../../../services/base.import";
import { loading_show, loading_hide } from '../../../app.helpers';
declare var jQuery: any;

@Component({
    selector: 'recargas_historial',
    templateUrl: 'recargas.historial.template.html'
})
export class recargas_historial_component {
    constructor(
        private recargasService: RecargasService,
        private alertService: AlertService) {
    }
public filter = "";
    public fechaDesde: string;
    public fechaHasta: string;
    public recargas = [];
    segmentDimmed: Boolean = true;

    ngOnInit() {
        let fecha = new Date();
        this.fechaDesde = fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + 1;
        this.fechaHasta = fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate();
        this.getRecargas();
    }

    onChangeFechaDesde(value:string) {
        this.fechaDesde = value;
        this.getRecargas();
    }

    onChangeFechaHasta(value:string) {
        this.fechaHasta = value;
        this.getRecargas();
    }

    getRecargas() {
        loading_show();
        this.recargasService.getHistorial(this.fechaDesde, this.fechaHasta, (data: Result) => {
            loading_hide();
            if (data.isOk) {
                this.recargas = data.Content;
            }

            this.segmentDimmed = false;
        });

    }
    
}