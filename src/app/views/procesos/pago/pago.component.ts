
import { Component, OnInit } from '@angular/core';
import { Result } from '../../../services/servers.service';
import { AlertService, VentasService } from "../../../services/base.import";
import { loading_show, loading_hide } from '../../../app.helpers';
import swal from 'sweetalert2';
declare var jQuery: any;

@Component({
    selector: 'pago',
    templateUrl: 'pago.template.html'
})
export class pago_component implements OnInit {
    constructor(private alertService: AlertService, private ventasService: VentasService) { }
    ngOnInit() {

    }

    public serial = "";
    public ticket = {};
    public consultado = false

    getTicket() {
        loading_show();
        this.ventasService.getTicketBySerial(this.serial, (data: Result) => {
            loading_hide();
            if (data.isOk) {
                this.consultado = true;
                let items = data.Content;
                let valor = 0;
                let i = 0;
                for (i = 0; i < items.Detalles.length; i++) {
                    let value = items.Detalles[i].value;

                    if (i == 0) {
                        if (items.Detalles[i].estado == 3) {
                            value = 1;
                        }
                        valor = value * (items['inversion'] + items['regalia']);
                        items.Detalles[i].valor = valor;
                        continue;
                    }

                    if (items.Detalles[i].estado == 3) {
                        value = 1;
                    }
                    valor = value * items.Detalles[i - 1].valor;
                    items.Detalles[i].valor = valor;

                }
                this.ticket = items;
            } else {
                this.alertService.error("Ticket no encontrado")
            }
        });
    }

    pagar(){
         var element = document.getElementById("wrapper");
        element.classList.add("blur");

        swal({
            title: 'Esta seguro?',
            text: "Desea realmente desea pagar este ticket",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Pagar!',
            cancelButtonText: 'Cancelar',
            allowOutsideClick: false
        }).then(() => {


         loading_show();
         var object = {
             serial: this.serial
         }
         console.log(object)
        this.ventasService.pagarTicket(object, (data: Result) => {
            loading_hide();
            console.log(data)
            if (data.isOk) {
                swal(
                        'Buen trabajo!',
                        'Ticket pagado con exito!'
                    )
               this.consultado = false;
               this.ticket = {};
               this.serial = "";
            } 
        });

        }).catch(swal.noop)
    }




}