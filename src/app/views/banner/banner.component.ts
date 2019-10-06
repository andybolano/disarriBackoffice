import { viewsModule } from './../../modules/view.module';
import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { AlertService, BannerService } from "../../services/base.import";
import { Result } from './../../services/servers.service';
import { loading_show, loading_hide } from '../../app.helpers';
import swal from 'sweetalert2';
declare var jQuery: any;
@Component({
    selector: 'bannerComponent',
    templateUrl: 'banner.template.html'
})
export class bannerComponent {

    constructor(
        private alertService: AlertService,
        private bannerService:BannerService
    ) {

    }

   
    public banners = [];
    public Banner = {id:0,texto:"", estado:""};
    public update = false;
    public filter="";
    ngOnInit() {
       this.getAll();
    }

 nuevo() {
        this.update = false;
        this.Banner = {
             id:0,
             texto: "",
             estado:""
        };
    }

     getAll() {
            loading_show();
            this.bannerService.getAll((data: Result) => {
                loading_hide();
                if (data.isOk) {
                    this.banners = data.Content;
                } else {
                    this.alertService.error(data.Mensaje);
                }

            });
    }

    save(){
         loading_show();
        this.bannerService.save(this.Banner,(data: Result) => {
            loading_hide();
            if (data.isOk) {
                      this.alertService.success(data.Mensaje);
                      this.nuevo();
                      this.getAll();
            } else {
                this.alertService.error(data.Mensaje);
            }

        });
    }
    
    delete(id: number) {

        var element = document.getElementById("wrapper");
        element.classList.add("blur");

        swal({
            title: 'Esta seguro?',
            text: "Desea realmente eliminar este banner? ",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar!',
            cancelButtonText: 'Cancelar',
            allowOutsideClick: false
        }).then(() => {

            loading_show();
            this.bannerService.eliminar(id, (data: Result) => {
                loading_hide();
                if (data.isOk) {
                    swal(
                        'Realizado!',
                        data.Mensaje,
                        'success'
                    )
                    this.getAll();
                }

            });
        }).catch(swal.noop)

    }

     editShow(item) {
        this.update = true;
        this.Banner = item;
    }

    updateBanner() {
        if (!this.Banner.texto) {
            this.alertService.warning("Ingresar texto!");
            return;
        }

        var object = {
            id: this.Banner.id,
            texto: this.Banner.texto,
        }

        this.bannerService.update(object, (data: Result) => {
            loading_hide();
            if (data.isOk) {
                this.alertService.success(data.Mensaje);
                this.getAll();
                jQuery('#modalBanner').modal('hide');
            } else {
                this.alertService.error(data.Mensaje);
            }

        });
    }


     updateEstado(state: Number, item: any) {
        loading_show();
        item.estado = state;
        this.bannerService.updateState(item, (data: Result) => {
            loading_hide();
            if (data.isOk) {
                this.alertService.success('Estado cambiado correctamente')
            }

        });
    }
    

}