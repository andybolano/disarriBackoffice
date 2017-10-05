
import { Component, OnInit } from '@angular/core';
import { Result } from '../../../services/servers.service';
import { AlertService, VentasService } from "../../../services/base.import";
import { loading_show, loading_hide } from '../../../app.helpers';
import swal from 'sweetalert2';
declare var jQuery: any;

@Component({
    selector: 'eliminar',
    templateUrl: 'eliminar.template.html'
})
export class eliminar_component implements OnInit {
    constructor(private alertService: AlertService, private ventasService: VentasService) { }
    ngOnInit() {

    }

    public codigo = "";
    public ticket = {};
    public consultado = false
    public datos = {};
    files: FileList;
    getTicket() {
        loading_show();
        this.ventasService.getTicket(parseInt(this.codigo), (data: Result) => {
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

    eliminar() {
        let formData: FormData = new FormData();

        var element = document.getElementById("wrapper");
        element.classList.add("blur");

        swal({
            title: 'Esta seguro?',
            text: "Desea realmente desea eliminar este ticket",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar!',
            cancelButtonText: 'Cancelar',
            allowOutsideClick: false
        }).then(() => {

            var object = {
                TicketCodigo: this.codigo,
                motivo: this.datos['motivo']
            }
      
            if(this.files){
                formData.append('imagen', this.files[0]);
            }
            formData.append('anulacion', JSON.stringify(object));

            loading_show();

           this.ventasService.eliminarTicket(formData, (data: Result) => {
                loading_hide();
                console.log(data)
                if (data.isOk) {
                    swal(
                        'Buen trabajo!',
                        'Ticket eliminado con exito!'
                    )
                    this.consultado = false;
                    this.ticket = {};
                    this.codigo = "";
                }
            });

        }).catch(swal.noop)
    }

    getFiles(event: any) {
        this.files = event.target.files;
        for (var i = 0, f; f = this.files[i]; i++) {
            if (!f.type.match('image.*')) {
                continue;
            }
            var reader = new FileReader();
            reader.onload = (function (theFile) {
                return function (e) {
                    document.getElementById("image").innerHTML = ['<img class="animated bounceIn" style="width:60%; margin-left:20%" src="', e.target.result, '" />'].join('');
                };
            })(f);
            reader.readAsDataURL(f);
        }
    }

}