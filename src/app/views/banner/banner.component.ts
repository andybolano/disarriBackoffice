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
<<<<<<< HEAD
    files: FileList;
    files_movil: FileList;
=======
>>>>>>> d0cc4a29bccc6ce7e8791a92a111c7ecdd3d657e
    ngOnInit() {
       this.getAll();
    }

 nuevo() {
<<<<<<< HEAD

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
=======
>>>>>>> d0cc4a29bccc6ce7e8791a92a111c7ecdd3d657e
        this.update = false;
        this.Banner = {
             id:0,
             texto: "",
             estado:""
        };
<<<<<<< HEAD
}
=======
    }
>>>>>>> d0cc4a29bccc6ce7e8791a92a111c7ecdd3d657e

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
<<<<<<< HEAD
     }

    save(){
        loading_show();
        let formData: FormData = new FormData();
        formData.append('imagen_pc', this.files[0]);
        formData.append('imagen_movil', this.files_movil[0]);
        formData.append('banner', JSON.stringify(this.Banner));
         loading_show();
        this.bannerService.save(formData,(data: Result) => {
=======
    }

    save(){
         loading_show();
        this.bannerService.save(this.Banner,(data: Result) => {
>>>>>>> d0cc4a29bccc6ce7e8791a92a111c7ecdd3d657e
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
<<<<<<< HEAD
         console.log(item)
        this.update = true;
        this.Banner = item;
        document.getElementById("image_pc").innerHTML = ['<img class="animated bounceIn" style="width:100%;" src="' + item.img_pc + '" />'].join('');
        document.getElementById("image_movil").innerHTML = ['<img class="animated bounceIn" style="width:100%;" src="' + item.img_movil + '" />'].join('');
    }

    updateBanner() {
       
=======
        this.update = true;
        this.Banner = item;
    }

    updateBanner() {
        if (!this.Banner.texto) {
            this.alertService.warning("Ingresar texto!");
            return;
        }

>>>>>>> d0cc4a29bccc6ce7e8791a92a111c7ecdd3d657e
        var object = {
            id: this.Banner.id,
            texto: this.Banner.texto,
        }

<<<<<<< HEAD
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
=======
        this.bannerService.update(object, (data: Result) => {
>>>>>>> d0cc4a29bccc6ce7e8791a92a111c7ecdd3d657e
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

<<<<<<< HEAD
=======

>>>>>>> d0cc4a29bccc6ce7e8791a92a111c7ecdd3d657e
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
<<<<<<< HEAD


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

        for (var i = 0, f; f = this.files[i]; i++) {
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

=======
>>>>>>> d0cc4a29bccc6ce7e8791a92a111c7ecdd3d657e
    

}