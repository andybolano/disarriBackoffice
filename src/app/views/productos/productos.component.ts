
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
        jQuery('#tallas').tagsinput('refresh');
        this.getProductos();

    }
    public filter = "";
    public productos = [];
    public images = [];
    public Producto = {
        id: 0,
        nombre: "",
        descripcion: "",
        tallas: ['XS', 'S', 'M'],
        colores: [
            {
                nombre:"",
                color:0
            }
        ],
        precio: 0,
        image: ""
    }
    files: FileList;

    public update = false;

    addColor() {
        let num = Math.floor(Math.random() * 10000);
        this.Producto.colores.push({nombre:"", color:num});
    }

    deleteColor(index) {
        this.Producto.colores.splice(index, 1);
    }

    getProductos() {
        loading_show();
        this.productosService.getAll((data: Result) => {
            loading_hide();
            if (data.isOk) {
                this.productos = data.Content;
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

     updateDisponible(state: Number, item: any) {
        loading_show();
        item.disponible = state;
        this.productosService.updateDisponible(item, (data: Result) => {
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
        if (!this.Producto.precio || this.Producto.precio == 0) {
            this.alertService.warning('Por favor ingresar el precio del producto');
            return;
        }
        if (!this.Producto.descripcion || this.Producto.descripcion == "") {
            this.alertService.warning('Por favor ingresar la descripcion del producto');
            return;
        }
        if (!this.files) {
            this.alertService.warning('Por favor cargar la imagen del producto');
            return;
        }
        let colores = this.Producto.colores;
        this.Producto.colores = [];
        for (let i = 0; i < colores.length; i++) {
            this.Producto.colores.push({nombre:jQuery('#color_' + i).val(),color:jQuery('#color_' + i).val()});
        }
        formData.append('imagen', this.files[0]);
        var tallas = jQuery('#tallas').val().split(",");
        var object = {
            nombre: this.Producto.nombre.toUpperCase(),
            tallas: tallas,
            precio: this.Producto.precio,
            descripcion: this.Producto.descripcion,
            colores: this.Producto.colores
        }

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
                    descripcion: "",
                    tallas: ['XS', 'S', 'M'],
                    colores: [
                        {
                            nombre:"",
                            color:0
                        }
                    ],
                    precio: 0,
                    image: ""
                }
                jQuery('#tallas').tagsinput('refresh');
                this.getProductos();
            } else {
                this.alertService.error(data.Mensaje);
            }

        });
    }

    editShow(item) {
        this.update = true;
        this.Producto = item.propiedades;
        console.log(item.colores.length)
        if(item.colores.length == 0){
             this.Producto.colores = [{nombre:"",color:0}]
        }else{
           this.Producto.colores = item.colores;
        }
       
        console.log(item)
        let tallas = "";
        jQuery('#tallas').tagsinput('removeAll');
        document.getElementById("image").innerHTML = ['<img class="animated bounceIn" style="width:60%;" src="' + item.propiedades.image + '" />'].join('');
        for (let i = 0; i < item.tallas.length; i++) {
            jQuery('#tallas').tagsinput('add', item.tallas[i]);
        }



        jQuery('#tallas').tagsinput('refresh');
    }

    viewImagenes(item) {
        this.Producto = item.propiedades;
        loading_show();
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
            descripcion: "",
            tallas: ['XS', 'S', 'M'],
            colores: [
            {
                nombre:"",
                color:0
            }
        ],
            precio: 0,
            image: ""
        }
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
        if (!this.Producto.precio || this.Producto.precio == 0) {
            this.alertService.warning('Por favor ingresar el precio del producto');
            return;
        }
        if (!this.Producto.descripcion || this.Producto.descripcion == "") {
            this.alertService.warning('Por favor ingresar la descripcion del producto');
            return;
        }

        let colores = this.Producto.colores;
        this.Producto.colores = [];
        for (let i = 0; i < colores.length; i++) {
            this.Producto.colores.push({color:jQuery('#color_' + i).val(),nombre:jQuery('#nombre_' + i).val()});
        }

        if (!this.files) {

        } else {
            formData.append('imagen', this.files[0]);
        }

        var tallas = jQuery('#tallas').val().split(",");
        var object = {
            id: this.Producto.id,
            nombre: this.Producto.nombre.toUpperCase(),
            tallas: tallas,
            precio: this.Producto.precio,
            descripcion: this.Producto.descripcion,
            colores: this.Producto.colores,
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
        formData.append('producto', JSON.stringify(this.Producto.id));

        this.productosService.saveImage(formData, (data: Result) => {
            loading_hide();
            if (data.isOk) {
                this.alertService.success(data.Mensaje);
                document.getElementById("image_galeria").innerHTML = '<div class="row">' +
                    '<div class="col-lg-12" style="text-align: center;">' +
                    '<i class="fa fa-image ico-bg"></i>' +
                    '</div>' +
                    '</div>';

                this.getImages(this.Producto.id);
            } else {
                this.alertService.error(data.Mensaje);
            }

        });
    }

    delete_image(image: any) {
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


}