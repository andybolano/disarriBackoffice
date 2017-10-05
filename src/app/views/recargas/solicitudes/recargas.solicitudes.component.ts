import { Result } from './../../../services/servers.service';
import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import swal from 'sweetalert2';
import { AlertService, RecargasService } from "../../../services/base.import";
import { loading_show, loading_hide } from '../../../app.helpers';
declare var jQuery: any;

@Component({
    selector: 'recargas_solicitudes',
    templateUrl: 'recargas.solicitudes.template.html'
})
export class recargas_solicitudes_component {

    constructor(
        private recargasService: RecargasService,
        private alertService: AlertService) {
    }

    ngOnInit() {
        this.getSolicitudes();
    }
public filter = "";
    public solicitudes = [];

    public getSolicitudes() {
        loading_show();
        this.recargasService.getSolititudes((data: Result) => {
            loading_hide();
            if (data.isOk) {
                this.solicitudes = data.Content;
            }
        });
    }
    
    public updateState = (state:string, estado:number, id:number) => {
        var element = document.getElementById("wrapper");
        element.classList.add("blur");

        swal({
            title: 'Esta seguro?',
            text: "Desea realmente cambiar esta recarga a: " + state,
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Cambiar!',
            cancelButtonText: 'Cancelar',
            allowOutsideClick: false
        }).then(() => {

            var object = {
                recarga_codigo: id,
                estado: estado,
            }

            loading_show();
            this.recargasService.changeState(object, (data: Result) => {
                loading_hide();
                if (data.isOk) {
                    swal(
                        state,
                        'La recarga ha sido cambiada actualizada.',
                        'success'
                    )

                    this.getSolicitudes();


                }
            });


        }).catch(swal.noop)
    }

}