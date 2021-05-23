
import { viewsModule } from './../../modules/view.module';
import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { AlertService, ColeccionService } from "../../services/base.import";
import { Result } from './../../services/servers.service';
import { loading_show, loading_hide } from '../../app.helpers';
import swal from 'sweetalert2';
declare var jQuery: any;
@Component({
    selector: 'coleccionComponent',
    templateUrl: 'colecciones.template.html'
})
export class coleccionComponent {

    constructor(
        private coleccionService: ColeccionService,
        private alertService: AlertService
    ) {

    }

    ngOnInit() {
        this.getAll();
    }

    public update = false;
    public Coleccion = {
        id: 0,
        nombre: "",


    };
    files: FileList;
    public filter = "";
    public colecciones = [];
    public images = [];

    nuevo() {
        this.update = false;
        this.Coleccion = {
            id: 0,
            nombre: "",
        };
    }
    getAll() {
        loading_show();
        this.coleccionService.getAll((data: Result) => {
            loading_hide();
            if (data.isOk) {
                this.colecciones = data.Content;
            } else {
                this.alertService.error(data.Mensaje);
            }

        });
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
                    document.getElementById("image").innerHTML = ['<img class="animated bounceIn" style="width:60%;" src="', e.target.result, '" />'].join('');
                };
            })(f);
            reader.readAsDataURL(f);
        }
    }

    save() {

        if (!this.Coleccion.nombre || this.Coleccion.nombre == "") {
            this.alertService.warning("Ingresar nombre!");
            return;
        }
        jQuery('#guardar').attr("disabled", true);
        loading_show();

        this.coleccionService.save(this.Coleccion, (data: Result) => {
            loading_hide();
            if (data.isOk) {
                jQuery('#guardar').attr("disabled", false);
                this.Coleccion = {
                    id: 0,
                    nombre: "",

                };
                this.alertService.success(data.Mensaje);
                this.getAll();
            } else {
                this.alertService.error(data.Mensaje);
            }

        });
    }

    editShow(item) {
        this.update = true;
        this.Coleccion = item;

    }

    delete(id: number) {

        var element = document.getElementById("wrapper");
        element.classList.add("blur");

        swal({
            title: 'Esta seguro?',
            text: "Desea realmente eliminar esta coleccion? ",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar!',
            cancelButtonText: 'Cancelar',
            allowOutsideClick: false
        }).then(() => {

            loading_show();
            this.coleccionService.eliminar(id, (data: Result) => {
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

    updateEstado(state: Number, item: any) {
        loading_show();
        item.estado = state;
        this.coleccionService.updateState(item, (data: Result) => {
            loading_hide();
            if (data.isOk) {
                this.alertService.success(data.Mensaje)
            }

        });
    }

    updateColeccion() {
        if (!this.Coleccion.nombre || this.Coleccion.nombre == "") {
            this.alertService.warning("Ingresar nombre!");
            return;
        }
        jQuery('#modificar').attr("disabled", true);
        loading_show();

        this.coleccionService.update(this.Coleccion, (data: Result) => {
            loading_hide();
            if (data.isOk) {
                jQuery('#modificar').attr("disabled", false);
                jQuery('#modalColeccion').modal('hide');
                this.Coleccion = {
                    id: 0,
                    nombre: "",

                };
                this.alertService.success(data.Mensaje);
                this.getAll();
            } else {
                this.alertService.error(data.Mensaje);
            }

        });
    }

    save_image(event: any) {

        var files = event.target.files;
        for (var i = 0, f; f = files[i]; i++) {
            if (!f.type.match('image.*')) {
                continue;
            }
            var reader = new FileReader();
            reader.onload = (function (theFile) {
                return function (e) {
                    document.getElementById("image_galeria").innerHTML = ['<img class="animated bounceIn" style="width:60%;" src="', e.target.result, '" />'].join('');
                };
            })(f);
            reader.readAsDataURL(f);
        }

        var formData = new FormData();
        formData.append('imagen', files[0]);
        formData.append('coleccion', JSON.stringify(this.Coleccion.id));

        this.coleccionService.saveImage(formData, (data: Result) => {
            loading_hide();
            if (data.isOk) {
                this.alertService.success(data.Mensaje);
                document.getElementById("image_galeria").innerHTML = '<div class="row">' +
                    '<div class="col-lg-12" style="text-align: center;">' +
                    '<i class="fa fa-image ico-bg"></i>' +
                    '</div>' +
                    '</div>';

                this.getImages(this.Coleccion.id);
            } else {
                this.alertService.error(data.Mensaje);
            }

        });
    }

<<<<<<< HEAD
    changeOrden(id, orden){
        loading_show();
        if(orden == ""){
            return;
        }
        var object = {
            id:id,
            orden:orden
        }
        this.coleccionService.updateOrden(object, (data: Result) => {
            loading_hide();
            if (data.isOk) {
                this.alertService.success('Orden cambiado correctamente')
            }

        });
    }


=======
>>>>>>> d0cc4a29bccc6ce7e8791a92a111c7ecdd3d657e
    delete_image(image: any) {
        this.coleccionService.deleteImage(image, (data: Result) => {
            loading_hide();
            if (data.isOk) {
                this.alertService.success(data.Mensaje);
                this.getImages(this.Coleccion.id);
            } else {
                this.alertService.error(data.Mensaje);
            }

        });
    }

    viewImagenes(item) {
        this.Coleccion = item;
        loading_show();
        this.getImages(this.Coleccion.id);
    }

     getImages(id) {
        this.coleccionService.getImages(id, (data: Result) => {
            loading_hide();
            if (data.isOk) {
                this.images = data.Content;
            }

        });
    }

    





}