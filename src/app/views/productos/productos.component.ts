
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
<<<<<<< HEAD
    public images_movil = [];
=======
>>>>>>> d0cc4a29bccc6ce7e8791a92a111c7ecdd3d657e
    public Producto = {
        id: 0,
        nombre: "",
        descripcion: "",
        tallas: ['XS', 'S', 'M'],
<<<<<<< HEAD
        descuentos: [],
        colores: [
            {
                nombre: "",
                color: 0
            }
        ],
        precio: 0,
        precio_usd: 0,
        image: "",
        compra_min: 1

    }
    public entradas = [];
    public salidas = [];
    Stock: any = {};
    public colorSelected = "";
    files: FileList;
    files_imgs: FileList;
=======
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
>>>>>>> d0cc4a29bccc6ce7e8791a92a111c7ecdd3d657e

    public update = false;

    addColor() {
        let num = Math.floor(Math.random() * 10000);
<<<<<<< HEAD
        this.Producto.colores.push({ nombre: "", color: num });
    }

    addDescuento() {
        this.Producto.descuentos.push({ cantidad: 1, descuento: 0 })
    }

    deleteDescuento(index) {
        this.Producto.descuentos.splice(index, 1);
    }


    init_producto() {
        this.Producto = {
            id: 0,
            nombre: "",
            descripcion: "",
            tallas: ['XS', 'S', 'M'],
            descuentos: [],
            colores: [
                {
                    nombre: "",
                    color: 0
                }
            ],
            precio: 0,
            precio_usd: 0,
            image: "",
            compra_min: 1
        }
    }



=======
        this.Producto.colores.push({nombre:"", color:num});
    }

>>>>>>> d0cc4a29bccc6ce7e8791a92a111c7ecdd3d657e
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

<<<<<<< HEAD
    changeOrden(id, orden) {
        loading_show();
        if (orden == "") {
            return;
        }
        var object = {
            id: id,
            orden: orden
        }
        this.productosService.updateOrden(object, (data: Result) => {
            loading_hide();
            if (data.isOk) {
                this.alertService.success('Orden cambiado correctamente')
            }

        });
    }

=======
>>>>>>> d0cc4a29bccc6ce7e8791a92a111c7ecdd3d657e
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

<<<<<<< HEAD
    updateDisponible(state: Number, item: any) {
=======
     updateDisponible(state: Number, item: any) {
>>>>>>> d0cc4a29bccc6ce7e8791a92a111c7ecdd3d657e
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
<<<<<<< HEAD
        if (!this.Producto.precio_usd || this.Producto.precio_usd == 0) {
            this.alertService.warning('Por favor ingresar el precio en dolares del producto');
            return;
        }
=======
>>>>>>> d0cc4a29bccc6ce7e8791a92a111c7ecdd3d657e
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
<<<<<<< HEAD
        let nombre_color = "";
        for (let i = 0; i < colores.length; i++) {
            nombre_color = jQuery('#nombre_' + i).val().replace(/\s/g, "_");
            this.Producto.colores.push({ nombre: nombre_color, color: jQuery('#color_' + i).val() });
        }
        formData.append('imagen', this.files[0]);
        var tallas = jQuery('#tallas').val().split(",");



=======
        for (let i = 0; i < colores.length; i++) {
            this.Producto.colores.push({nombre:jQuery('#color_' + i).val(),color:jQuery('#color_' + i).val()});
        }
        formData.append('imagen', this.files[0]);
        var tallas = jQuery('#tallas').val().split(",");
>>>>>>> d0cc4a29bccc6ce7e8791a92a111c7ecdd3d657e
        var object = {
            nombre: this.Producto.nombre.toUpperCase(),
            tallas: tallas,
            precio: this.Producto.precio,
<<<<<<< HEAD
            precio_usd: this.Producto.precio_usd,
            descripcion: this.Producto.descripcion,
            colores: this.Producto.colores,
            compra_min: this.Producto.compra_min,
            descuentos: this.Producto.descuentos
=======
            descripcion: this.Producto.descripcion,
            colores: this.Producto.colores
>>>>>>> d0cc4a29bccc6ce7e8791a92a111c7ecdd3d657e
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
<<<<<<< HEAD
                this.init_producto();
=======
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
>>>>>>> d0cc4a29bccc6ce7e8791a92a111c7ecdd3d657e
                jQuery('#tallas').tagsinput('refresh');
                this.getProductos();
            } else {
                this.alertService.error(data.Mensaje);
            }

        });
    }

<<<<<<< HEAD
    saveStock(id) {
        if (!this.Stock.talla) {
            this.alertService.error("Seleccionar talla");
            return;
        }

        if (!this.Stock.color) {
            this.alertService.error("Seleccionar color");
            return;
        }

        if (!this.Stock.cantidad || this.Stock.cantidad == 0) {
            this.alertService.error("Ingresar cantidad");
            return;
        }

        this.Stock.producto = id;

        loading_show();
        this.productosService.saveStock(this.Stock, (data: Result) => {
            loading_hide();
            if (data.isOk) {
                this.Stock = {};
                this.getStock(id);
                this.alertService.success(data.Mensaje);
            } else {
                this.alertService.error(data.Mensaje);
            }

        });
    }

    getStock(id) {
        loading_show();
        this.productosService.getStock(id, (data: Result) => {
            loading_hide();
            if (data.isOk) {
                this.entradas = data.Content;

            } else {
                this.alertService.error(data.Mensaje);
            }

        });
    }

    deleteStock(id_talla, id_color) {

        swal({
            title: 'Esta seguro?',
            text: "Desea realmente eliminar? la cantidad para esta talla y este color quedaran en 0 ",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar!',
            cancelButtonText: 'Cancelar',
            allowOutsideClick: false
        }).then(() => {


            var object = {
                talla: id_talla,
                color: id_color,
            }
            loading_show();
            this.productosService.deleteStock(object, (data: Result) => {
                loading_hide();
                if (data.isOk) {
                    swal(
                        'Realizado!',
                        data.Mensaje,
                        'success'
                    )
                    this.getStock(this.Producto.id);
                    this.alertService.success(data.Mensaje);
                } else {
                    this.alertService.error(data.Mensaje);
                }

            });

        }).catch(swal.noop)
    }

    viewStock(item) {
        this.Producto = item.propiedades;
        this.Producto.colores = item.colores;
        this.Producto.tallas = item.tallas;
        this.getStock(this.Producto.id);
    }

    editShow(item) {
        this.update = true;
        this.Producto = item.propiedades;
        if (item.colores.length == 0) {
            this.Producto.colores = [{ nombre: "", color: 0 }]
        } else {
            this.Producto.colores = item.colores;
        }

        if (item.descuentos.length == 0) {
            this.Producto.descuentos = [];
        } else {
            this.Producto.descuentos = item.descuentos;
        }



=======
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
>>>>>>> d0cc4a29bccc6ce7e8791a92a111c7ecdd3d657e
        let tallas = "";
        jQuery('#tallas').tagsinput('removeAll');
        document.getElementById("image").innerHTML = ['<img class="animated bounceIn" style="width:60%;" src="' + item.propiedades.image + '" />'].join('');
        for (let i = 0; i < item.tallas.length; i++) {
<<<<<<< HEAD
            jQuery('#tallas').tagsinput('add', item.tallas[i].talla);
=======
            jQuery('#tallas').tagsinput('add', item.tallas[i]);
>>>>>>> d0cc4a29bccc6ce7e8791a92a111c7ecdd3d657e
        }



        jQuery('#tallas').tagsinput('refresh');
    }

    viewImagenes(item) {
<<<<<<< HEAD
        loading_show();
        this.Producto = item.propiedades;
        this.Producto.colores = item.colores;
        this.getImages(this.Producto.id);
        console.log(this.Producto)
    }

    viewImagenesMovil(item) {
        loading_show();
        this.Producto = item.propiedades;
        this.Producto.colores = item.colores;
        this.getImagesMovil(this.Producto.id);
        console.log(this.Producto)
=======
        this.Producto = item.propiedades;
        loading_show();
        this.getImages(this.Producto.id);
>>>>>>> d0cc4a29bccc6ce7e8791a92a111c7ecdd3d657e
    }

    getImages(id) {
        this.productosService.getImages(id, (data: Result) => {
            loading_hide();
            if (data.isOk) {
                this.images = data.Content;
            }

        });
    }

<<<<<<< HEAD
    getImagesMovil(id) {
        this.productosService.getImagesMovil(id, (data: Result) => {
            loading_hide();
            if (data.isOk) {
                this.images_movil = data.Content;
            }

        });
    }

=======
>>>>>>> d0cc4a29bccc6ce7e8791a92a111c7ecdd3d657e
    nuevo() {

        document.getElementById("image").innerHTML = '<div class="row">' +
            '<div class="col-lg-12" style="text-align: center;">' +
            '<i class="fa fa-image ico-bg"></i>' +
            '</div>' +
            '</div>';
        this.update = false;
<<<<<<< HEAD
        this.init_producto();
=======
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
>>>>>>> d0cc4a29bccc6ce7e8791a92a111c7ecdd3d657e
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
<<<<<<< HEAD
        if (!this.Producto.precio_usd || this.Producto.precio_usd == 0) {
            this.alertService.warning('Por favor ingresar el precio del producto');
            return;
        }
=======
>>>>>>> d0cc4a29bccc6ce7e8791a92a111c7ecdd3d657e
        if (!this.Producto.descripcion || this.Producto.descripcion == "") {
            this.alertService.warning('Por favor ingresar la descripcion del producto');
            return;
        }

        let colores = this.Producto.colores;
        this.Producto.colores = [];
<<<<<<< HEAD
        let nombre_color = "";
        for (let i = 0; i < colores.length; i++) {
            nombre_color = jQuery('#nombre_' + i).val().replace(/\s/g, "_");
            this.Producto.colores.push({ nombre: nombre_color, color: jQuery('#color_' + i).val() });
=======
        for (let i = 0; i < colores.length; i++) {
            this.Producto.colores.push({color:jQuery('#color_' + i).val(),nombre:jQuery('#nombre_' + i).val()});
>>>>>>> d0cc4a29bccc6ce7e8791a92a111c7ecdd3d657e
        }

        if (!this.files) {

        } else {
            formData.append('imagen', this.files[0]);
        }

        var tallas = jQuery('#tallas').val().split(",");
<<<<<<< HEAD


=======
>>>>>>> d0cc4a29bccc6ce7e8791a92a111c7ecdd3d657e
        var object = {
            id: this.Producto.id,
            nombre: this.Producto.nombre.toUpperCase(),
            tallas: tallas,
            precio: this.Producto.precio,
<<<<<<< HEAD
            precio_usd: this.Producto.precio_usd,
            descripcion: this.Producto.descripcion,
            colores: this.Producto.colores,
            imagen: this.Producto.image,
            compra_min: this.Producto.compra_min,
            descuentos: this.Producto.descuentos
        }

=======
            descripcion: this.Producto.descripcion,
            colores: this.Producto.colores,
            imagen: this.Producto.image
        }



>>>>>>> d0cc4a29bccc6ce7e8791a92a111c7ecdd3d657e
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

<<<<<<< HEAD
        this.files_imgs = event.target.files;
        for (var i = 0, f; f = this.files_imgs[i]; i++) {
=======
        var files = event.target.files;
        for (var i = 0, f; f = files[i]; i++) {
>>>>>>> d0cc4a29bccc6ce7e8791a92a111c7ecdd3d657e
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

<<<<<<< HEAD
    }

    save_image_movil(event: any) {

        this.files_imgs = event.target.files;
        for (var i = 0, f; f = this.files_imgs[i]; i++) {
            if (!f.type.match('image.*')) {
                continue;
            }
            var reader = new FileReader();
            reader.onload = (function (theFile) {
                return function (e) {
                    document.getElementById("image_galeria_movil").innerHTML = ['<img class="animated bounceIn" style="width:60%;" src="', e.target.result, '" />'].join('');
                };
            })(f);
            reader.readAsDataURL(f);
        }

    }

    post_image() {
        if (!this.files_imgs) {
            this.alertService.error("Cargar una imagen de la prenda");
            return;
        }
        if (this.colorSelected == "") {
            this.alertService.error("Seleccionar el color de la prenda");
            return;
        }
        var color = this.colorSelected.split(";");
        var formData = new FormData();
        formData.append('imagen', this.files_imgs[0]);
        formData.append('producto', JSON.stringify(this.Producto.id));
        formData.append('color', color[1]);
        loading_show();
=======
        var formData = new FormData();
        formData.append('imagen', files[0]);
        formData.append('producto', JSON.stringify(this.Producto.id));

>>>>>>> d0cc4a29bccc6ce7e8791a92a111c7ecdd3d657e
        this.productosService.saveImage(formData, (data: Result) => {
            loading_hide();
            if (data.isOk) {
                this.alertService.success(data.Mensaje);
                document.getElementById("image_galeria").innerHTML = '<div class="row">' +
                    '<div class="col-lg-12" style="text-align: center;">' +
                    '<i class="fa fa-image ico-bg"></i>' +
                    '</div>' +
                    '</div>';
<<<<<<< HEAD
                jQuery("#color").css("background-color", '#FFF');
                this.colorSelected = "";
                this.getImages(this.Producto.id);
            } else {
                this.alertService.error(data.Mensaje);
            }

        });
    }

    post_image_movil() {
        if (!this.files_imgs) {
            this.alertService.error("Cargar una imagen de la prenda");
            return;
        }
        if (this.colorSelected == "") {
            this.alertService.error("Seleccionar el color de la prenda");
            return;
        }
        var color = this.colorSelected.split(";");
        var formData = new FormData();
        formData.append('imagen', this.files_imgs[0]);
        formData.append('producto', JSON.stringify(this.Producto.id));
        formData.append('color', color[1]);
        loading_show();
        this.productosService.saveImageMovil(formData, (data: Result) => {
            loading_hide();
            if (data.isOk) {
                this.alertService.success(data.Mensaje);
                document.getElementById("image_galeria_movil").innerHTML = '<div class="row">' +
                    '<div class="col-lg-12" style="text-align: center;">' +
                    '<i class="fa fa-image ico-bg"></i>' +
                    '</div>' +
                    '</div>';
                jQuery("#color").css("background-color", '#FFF');
                this.colorSelected = "";
                this.getImagesMovil(this.Producto.id);
=======

                this.getImages(this.Producto.id);
>>>>>>> d0cc4a29bccc6ce7e8791a92a111c7ecdd3d657e
            } else {
                this.alertService.error(data.Mensaje);
            }

        });
    }

    delete_image(image: any) {
<<<<<<< HEAD
        loading_show();
=======
>>>>>>> d0cc4a29bccc6ce7e8791a92a111c7ecdd3d657e
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

<<<<<<< HEAD
    delete_image_movil(image: any) {
        loading_show();
        this.productosService.deleteImageMovil(image, (data: Result) => {
            loading_hide();
            if (data.isOk) {
                this.alertService.success(data.Mensaje);
                this.getImagesMovil(this.Producto.id);
            } else {
                this.alertService.error(data.Mensaje);
            }

        });
    }

    colorUpdate(event: any) {
        var valores = event.target.value.split(";");
        var color = valores[0];
        var imagen = valores[1];
        loading_show();

        var object = {
            color: color,
            imagen: imagen
        }
        this.productosService.updateColor(object, (data: Result) => {
            loading_hide();
            if (data.isOk) {
                this.alertService.success(data.Mensaje);
            } else {
                this.alertService.error(data.Mensaje);
            }

        });


    }

    colorUpdateMobil(event: any) {
        var valores = event.target.value.split(";");
        var color = valores[0];
        var imagen = valores[1];
        loading_show();

        var object = {
            color: color,
            imagen: imagen
        }
        this.productosService.updateColorMobil(object, (data: Result) => {
            loading_hide();
            if (data.isOk) {
                this.alertService.success(data.Mensaje);
            } else {
                this.alertService.error(data.Mensaje);
            }

        });


    }

    color(event: any) {
        var color = event.target.value.split(";");
        jQuery("#color").css("background-color", color[0]);
    }

=======
>>>>>>> d0cc4a29bccc6ce7e8791a92a111c7ecdd3d657e

}