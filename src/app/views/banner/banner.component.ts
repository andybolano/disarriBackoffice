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
    public Banner = {id:0,texto:"", estado:"", enlace:""};
    public update = false;
    public filter="";
    files: FileList;
    files_movil: FileList;
    ngOnInit() {
       this.getAll();
    }

 nuevo() {

    document.getElementById("image_pc").innerHTML = '<div class="row">' +
    '<div class="col-lg-12" style="text-align: center;">' +
    '<i class="fa fa-image ico-bg"></i>' +
    '</div>' +
    '</div>';

    document.getElementById("image_movil").innerHTML = '<div class="row">' +
    '<div class="col-lg-12" style="text-align: center;">' +
    '<i class="fa fa-image ico-bg"></i>' +
    '</div>' +
    '</div>';
        this.update = false;
        this.Banner = {
             id:0,
             texto: "",
             estado:"",
             enlace:""
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
        let formData: FormData = new FormData();

        if(!this.files){
            this.alertService.warning("Cargar imagen para pc");
            return;
        }
        if(!this.files_movil){
            this.alertService.warning("Cargar imagen para movil");
            return;
        }


        formData.append('imagen_pc', this.files[0]);
        formData.append('imagen_movil', this.files_movil[0]);


        formData.append('banner', JSON.stringify(this.Banner));
         loading_show();
        this.bannerService.save(formData,(data: Result) => {
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

    changeOrden(id, orden){
        loading_show();
        if(orden == ""){
            return;
        }
        var object = {
            id:id,
            orden:orden
        }
        this.bannerService.updateOrden(object, (data: Result) => {
            loading_hide();
            if (data.isOk) {
                this.alertService.success('Orden cambiado correctamente')
            }

        });
    }

    editShow(item) {
         console.log(item)
        this.update = true;
        this.Banner = item;
        document.getElementById("image_pc").innerHTML = ['<img class="animated bounceIn" style="width:100%;" src="' + item.img_pc + '" />'].join('');
        document.getElementById("image_movil").innerHTML = ['<img class="animated bounceIn" style="width:100%;" src="' + item.img_movil + '" />'].join('');
    }

    updateBanner() {
       
        var object = {
            id: this.Banner.id,
            texto: this.Banner.texto,
            enlace: this.Banner.enlace
        }

        let formData: FormData = new FormData();
        if(this.files){
            formData.append('imagen_pc', this.files[0]);
        }
        
        if(this.files_movil){
            formData.append('imagen_movil', this.files_movil[0]);
        }
       
        formData.append('banner', JSON.stringify(object));
        loading_show();

        this.bannerService.update(formData, (data: Result) => {
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

    updateMenu(state: Number, item: any) {
        loading_show();
        item.menu_color = state;
        this.bannerService.updateMenu(item, (data: Result) => {
            loading_hide();
            if (data.isOk) {
                this.alertService.success('Cambiado correctamente')
            }

        });
    }



    getFilesPc(event: any) {
        this.files = event.target.files;

        for (var i = 0, f; f = this.files[i]; i++) {
            if (!f.type.match('image.*')) {
                continue;
            }
            var reader = new FileReader();
            reader.onload = (function (theFile) {
                return function (e) {
                    document.getElementById("image_pc").innerHTML = ['<img class="animated bounceIn" style="width:100%;" src="', e.target.result, '" />'].join('');
                };
            })(f);
            reader.readAsDataURL(f);
        }
    }

    getFilesMovil(event: any) {
        this.files_movil = event.target.files;

        for (var i = 0, f; f = this.files_movil[i]; i++) {
            if (!f.type.match('image.*')) {
                continue;
            }
            var reader = new FileReader();
            reader.onload = (function (theFile) {
                return function (e) {
                    document.getElementById("image_movil").innerHTML = ['<img class="animated bounceIn" style="width:100%;" src="', e.target.result, '" />'].join('');
                };
            })(f);
            reader.readAsDataURL(f);
        }
    }

    

}