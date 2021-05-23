import { viewsModule } from './../../modules/view.module';

import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { AlertService, BlogService } from "../../services/base.import";
import { Result } from './../../services/servers.service';
import { loading_show, loading_hide } from '../../app.helpers';
import swal from 'sweetalert2';
declare var jQuery: any;
@Component({
    selector: 'blogComponent',
    templateUrl: 'blog.template.html'
})
export class blogComponent {

    constructor(
        private blogService: BlogService,
        private alertService: AlertService
    ) {

    }

    ngOnInit() {
        jQuery('#summernote').summernote({
            toolbar: [
                // [groupName, [list of button]]
                ['style', ['bold', 'italic', 'underline', 'clear']],
                ['font', ['strikethrough', 'superscript', 'subscript']],
                ['fontsize', ['fontsize']],
                ['color', ['color']],
                ['para', ['ul', 'ol', 'paragraph']],
                ['height', ['300']],

            ],
            height: 280
        });

        this.getAll();

    }

    public update = false;
    public Articulo = {
        id:0,
        fecha: "",
        titulo: "",
        descripcion: "",
        url: "",
        imagen: ""

    };
    files: FileList;
    public filter = "";
    public articulos = [];

    nuevo() {

        document.getElementById("image").innerHTML = '<div class="row">' +
            '<div class="col-lg-12" style="text-align: center;">' +
            '<i class="fa fa-image ico-bg"></i>' +
            '</div>' +
            '</div>';

        this.update = false;
        this.Articulo = {
             id:0,
            fecha: "",
            titulo: "",
            descripcion: "",
            url: "",
            imagen: ""
        };
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
      
        let formData: FormData = new FormData();
        var descripcion = jQuery('#summernote').summernote('code');
        if (!this.Articulo.titulo || this.Articulo.titulo == "") {
            this.alertService.warning("Ingresar titulo!");
            return;
        }

        if (!this.Articulo.fecha || this.Articulo.fecha == "") {
            this.alertService.warning("Ingresar fecha!");
            return;
        }

      

        if (!this.files) {
            this.alertService.warning('Por favor cargar la imagen del artitulo');
            return;
        }
        var object = {
            titulo: this.Articulo.titulo,
            fecha: this.Articulo.fecha,
            url: this.Articulo.url,
            descripcion: descripcion
        }
        formData.append('articulo', JSON.stringify(object));
        formData.append('imagen', this.files[0]);

        jQuery('#guardar').attr("disabled", true);
        loading_show();

        this.blogService.save(formData, (data: Result) => {
            loading_hide();
            if (data.isOk) {
                jQuery('#guardar').attr("disabled", false);
                jQuery('#summernote').summernote('code', '');
                document.getElementById("image").innerHTML = '<div class="row">' +
                    '<div class="col-lg-12" style="text-align: center;">' +
                    '<i class="fa fa-image ico-bg"></i>' +
                    '</div>' +
                    '</div>';
                this.Articulo = {
                     id:0,
                    fecha: "",
                    titulo: "",
                    descripcion: "",
                    url: "",
                    imagen: ""
                };
                this.alertService.success('Articulo guardado correctamente');
                this.getAll();
            } else {
                this.alertService.error(data.Mensaje);
            }

        });
    }

    getAll() {
        loading_show();
        this.blogService.getAll((data: Result) => {
            loading_hide();
            if (data.isOk) {
                this.articulos = data.Content;
            } else {
                this.alertService.error(data.Mensaje);
            }

        });
    }

    editShow(item) {
        this.update = true;
        this.Articulo = item;
        jQuery('#summernote').summernote('code', item.descripcion);
        document.getElementById("image").innerHTML = ['<img class="animated bounceIn" style="width:60%;" src="' + item.imagen + '" />'].join('');
    }

    updateBlog() {
  
        let formData: FormData = new FormData();
        var descripcion = jQuery('#summernote').summernote('code');
        if (!this.Articulo.titulo || this.Articulo.titulo == "") {
            this.alertService.warning("Ingresar titulo!");
            return;
        }

        if (!this.Articulo.fecha || this.Articulo.fecha == "") {
            this.alertService.warning("Ingresar fecha!");
            return;
        }

       
        var object = {
            id: this.Articulo.id,
            titulo: this.Articulo.titulo,
            fecha: this.Articulo.fecha,
            url: this.Articulo.url,
            descripcion: descripcion,
            imagen:this.Articulo.imagen
        }
        formData.append('articulo', JSON.stringify(object));
        if (!this.files) {

        } else {
            formData.append('imagen', this.files[0]);
        }

        jQuery('#modificar').attr("disabled", true);
        loading_show();
        
        this.blogService.update(formData, (data: Result) => {
            loading_hide();
            if (data.isOk) {
                jQuery('#modalArticulo').modal('hide');
                jQuery('#modificar').attr("disabled", false);
                jQuery('#summernote').summernote('code', '');
                document.getElementById("image").innerHTML = '<div class="row">' +
                    '<div class="col-lg-12" style="text-align: center;">' +
                    '<i class="fa fa-image ico-bg"></i>' +
                    '</div>' +
                    '</div>';
                this.Articulo = {
                    id:0,
                    fecha: "",
                    titulo: "",
                    descripcion: "",
                    url: "",
                    imagen: ""
                };
                this.alertService.success(data.Mensaje);
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
            text: "Desea realmente eliminar este artículo? ",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar!',
            cancelButtonText: 'Cancelar',
            allowOutsideClick: false
        }).then(() => {

            loading_show();
            this.blogService.eliminar(id, (data: Result) => {
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
        this.blogService.updateState(item, (data: Result) => {
            loading_hide();
            if (data.isOk) {
                this.alertService.success('Estado cambiado correctamente')
            }

        });
    }

}