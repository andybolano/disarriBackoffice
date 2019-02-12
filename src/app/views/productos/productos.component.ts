
import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { AlertService, ProductosService } from "../../services/base.import";
import { Result } from './../../services/servers.service';
import { loading_show, loading_hide } from '../../app.helpers';
import swal from 'sweetalert2';
declare var jQuery: any;
@Component({
    selector: 'productosComponent',
    templateUrl: 'productos.template.html'
})
export class productosComponent {

    constructor(
        private productosService: ProductosService,
        private alertService: AlertService
    ) {
    }


    ngOnInit() {
        this.getProductos();

    }
    public filter = "";
    public productos = [];
    public images = [];
    public color = {
        nombre:""
    };
    public Producto = {
        id: 0,
        nombre: "",
        image: ""
    }

    files: FileList;
    files_imgs: FileList;
    public update = false;

    getProductos() {
        loading_show();
        this.productosService.getAll((data: Result) => {
           loading_hide();
            if (data.isOk) {
                this.productos = data.Content;
            }
        });
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
        this.productosService.updateOrden(object, (data: Result) => {
            loading_hide();
            if (data.isOk) {
                this.alertService.success('Orden cambiado correctamente')
            }

        });
    }

    updateEstado(state: Number, item: any) {
        loading_show();
        item.estado = state;
        this.productosService.update(item, (data: Result) => {
            loading_hide();
            if (data.isOk) {
                this.alertService.success('Estado cambiado correctamente')
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
        let formData: FormData = new FormData();
        if (!this.Producto.nombre || this.Producto.nombre == "") {
            this.alertService.warning('Por favor ingresar el nombre del producto');
            return;
        }
       
        if (!this.files) {
            this.alertService.warning('Por favor cargar la imagen del producto');
            return;
        }
    
        
      
        var object = {
            nombre: this.Producto.nombre,
        }
        formData.append('imagen', this.files[0]);
        formData.append('producto', JSON.stringify(object));
        loading_show();
        this.productosService.save(formData, (data: Result) => {
            loading_hide();
            if (data.isOk) {
                this.alertService.success(data.Mensaje);
                document.getElementById("image").innerHTML = '<div class="row">' +
                    '<div class="col-lg-12" style="text-align: center;">' +
                    '<i class="fa fa-image ico-bg"></i>' +
                    '</div>' +
                    '</div>';
                this.Producto = {
                    id: 0,
                    nombre: "",
                    image: ""
                }
                this.getProductos();
            } else {
                this.alertService.error(data.Mensaje);
            }

        });
    }

    nuevo() {

        document.getElementById("image").innerHTML = '<div class="row">' +
            '<div class="col-lg-12" style="text-align: center;">' +
            '<i class="fa fa-image ico-bg"></i>' +
            '</div>' +
            '</div>';
        this.update = false;
        this.Producto = {
            id: 0,
            nombre: "",
            image:""
            
        }
    }

    editShow(item) {
        this.update = true;
        this.Producto = item;
        document.getElementById("image").innerHTML = ['<img class="animated bounceIn" style="width:60%;" src="' + item.image + '" />'].join('');
    }

    viewImagenes(item) {
        loading_show();
            this.Producto = item;
            this.getImages(this.Producto.id); 
    }

    getImages(id) {
        this.productosService.getImages(id, (data: Result) => {
            loading_hide();
            if (data.isOk) {
                this.images = data.Content;
            }

        });
    }

    delete(id: number) {

        var element = document.getElementById("wrapper");
        element.classList.add("blur");

        swal({
            title: 'Esta seguro?',
            text: "Desea realmente eliminar este producto? ",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar!',
            cancelButtonText: 'Cancelar',
            allowOutsideClick: false
        }).then(() => {

            loading_show();
            this.productosService.eliminarProducto(id, (data: Result) => {
                loading_hide();
                if (data.isOk) {
                    swal(
                        'Realizado!',
                        data.Mensaje,
                        'success'
                    )
                    this.getProductos();
                }

            });
        }).catch(swal.noop)

    }

    updateProducto() {
        let formData: FormData = new FormData();
        if (!this.Producto.nombre || this.Producto.nombre == "") {
            this.alertService.warning('Por favor ingresar el nombre del producto');
            return;
        }
        

        if (!this.files) {

        } else {
            formData.append('imagen', this.files[0]);
        }

      
        var object = {
            id: this.Producto.id,
            nombre: this.Producto.nombre,
            imagen: this.Producto.image
        }
        formData.append('producto', JSON.stringify(object));
        loading_show();
        this.productosService.updateProducto(formData, (data: Result) => {
            loading_hide();
            if (data.isOk) {
                this.alertService.success(data.Mensaje);
                document.getElementById("image").innerHTML = '<div class="row">' +
                    '<div class="col-lg-12" style="text-align: center;">' +
                    '<i class="fa fa-image ico-bg"></i>' +
                    '</div>' +
                    '</div>';

                jQuery('#modalProducto').modal('hide');
                this.getProductos();
            } else {
                this.alertService.error(data.Mensaje);
            }

        });
    }


    load_image_galeria(event: any) {

       this.files_imgs = event.target.files;
        for (var i = 0, f; f = this.files_imgs[i]; i++) {
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

    }

    save_image(){
        if(!this.files_imgs){
            this.alertService.error("Cargar una imagen de la prenda");
            return;
        }
        if(this.color.nombre == ""){
            this.alertService.error("Seleccionar el color de la prenda");
            return;
        }

        console.log(this.color)
        var formData = new FormData();
        formData.append('imagen', this.files_imgs[0]);
        formData.append('producto', JSON.stringify(this.Producto.id));
        var color = this.color.nombre;
        formData.append('color', color);
         loading_show();
        this.productosService.saveImage(formData, (data: Result) => {
            loading_hide();
            if (data.isOk) {
                this.alertService.success(data.Mensaje);
                document.getElementById("image_galeria").innerHTML = '<div class="row">' +
                    '<div class="col-lg-12" style="text-align: center;">' +
                    '<i class="fa fa-image ico-bg"></i>' +
                    '</div>' +
                    '</div>';
                    this.color.nombre = "";
                this.getImages(this.Producto.id);
            } else {
                this.alertService.error(data.Mensaje);
            }

        });
    }

    delete_image(image: any) {
     loading_show();
        this.productosService.deleteImage(image, (data: Result) => {
            loading_hide();
            if (data.isOk) {
                this.alertService.success(data.Mensaje);
                this.getImages(this.Producto.id);
            } else {
                this.alertService.error(data.Mensaje);
            }

        });
    }

    changeOrdenImage(id, orden){
        loading_show();
        if(orden == ""){
            return;
        }
        var object = {
            id:id,
            orden:orden
        }
        this.productosService.updateOrdenImagen(object, (data: Result) => {
            loading_hide();
            if (data.isOk) {
                this.alertService.success('Orden cambiado correctamente')
            }

        });
    }

}