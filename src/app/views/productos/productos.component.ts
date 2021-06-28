
import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { AlertService, CategoriasService, ProductosService, SubcategoriasService, TagsService } from "../../services/base.import";
import { Result } from './../../services/servers.service';
import { loading_show, loading_hide } from '../../app.helpers';
import swal from 'sweetalert2';
declare var jQuery: any;
@Component({
    selector: 'productosComponent',
    templateUrl: 'productos.template.html'
})
export class productosComponent {


    public filter = "";
    public productos = [];
    public images = [];
    public images_movil = [];
    public categorias = [];
    public subcategorias = [];
    public tags = [];
    public entradas = [];
    public salidas = [];
    Stock: any = {};
    public colorSelected = "";
    files: FileList;
    files_imgs: FileList;
    files_medidas_escritorio: FileList;
    files_medidas_movil: FileList;
    public update = false;
    public Producto = {
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
        precio_ant: 0,
        precio_ant_usd: 0,
        image: "",
        compra_min: 1,
        categoria_id: null,
        subcategoria_id: null,
        tags_id: [],
        image_medidas_escritorio: "",
        image_medidas_movil: ""
    };


    constructor(
        private productosService: ProductosService,
        private alertService: AlertService,
        private categoriasService: CategoriasService,
        private subcategoriasService: SubcategoriasService,
        private tagsService: TagsService,
    ) {

    }


    ngOnInit() {
        jQuery('#tallas').tagsinput('refresh');
        this.getProductos();
        this.getCategorias();
        this.getTags();
    }

    addColor() {
        let num = Math.floor(Math.random() * 10000);
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
            precio_ant: 0,
            precio_ant_usd: 0,
            image: "",
            compra_min: 1,
            categoria_id: null,
            subcategoria_id: null,
            tags_id: [],
            image_medidas_escritorio: "",
            image_medidas_movil: ""
        }
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
        if (!this.Producto.precio_usd || this.Producto.precio_usd == 0) {
            this.alertService.warning('Por favor ingresar el precio en dolares del producto');
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
        let nombre_color = "";
        for (let i = 0; i < colores.length; i++) {
            nombre_color = jQuery('#nombre_' + i).val().replace(/\s/g, "_");
            this.Producto.colores.push({ nombre: nombre_color, color: jQuery('#color_' + i).val() });
        }
        formData.append('imagen', this.files[0]);
        var tallas = jQuery('#tallas').val().split(",");



        var object = {
            nombre: this.Producto.nombre.toUpperCase(),
            tallas: tallas,
            precio: this.Producto.precio,
            precio_usd: this.Producto.precio_usd,
            descripcion: this.Producto.descripcion,
            colores: this.Producto.colores,
            compra_min: this.Producto.compra_min,
            descuentos: this.Producto.descuentos,
            precio_ant: this.Producto.precio_ant,
            precio_ant_usd: this.Producto.precio_ant_usd,
            categoria_id: this.Producto.categoria_id,
            subcategoria_id: this.Producto.subcategoria_id,
            tags_id: this.tags.filter(o=> o.seleccionado).map(o=> o.id)
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
                this.init_producto();
                jQuery('#tallas').tagsinput('refresh');
                this.getProductos();
            } else {
                this.alertService.error(data.Mensaje);
            }

        });
    }

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



        let tallas = "";
        jQuery('#tallas').tagsinput('removeAll');
        document.getElementById("image").innerHTML = ['<img class="animated bounceIn" style="width:60%;" src="' + item.propiedades.image + '" />'].join('');
        for (let i = 0; i < item.tallas.length; i++) {
            jQuery('#tallas').tagsinput('add', item.tallas[i].talla);
        }



        jQuery('#tallas').tagsinput('refresh');
    }

    viewImagenes(item) {
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
    }

    getImages(id) {
        this.productosService.getImages(id, (data: Result) => {
            loading_hide();
            if (data.isOk) {
                this.images = data.Content;
            }

        });
    }

    getImagesMovil(id) {
        this.productosService.getImagesMovil(id, (data: Result) => {
            loading_hide();
            if (data.isOk) {
                this.images_movil = data.Content;
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
        this.init_producto();
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
        if (!this.Producto.precio_usd || this.Producto.precio_usd == 0) {
            this.alertService.warning('Por favor ingresar el precio del producto');
            return;
        }
        if (!this.Producto.descripcion || this.Producto.descripcion == "") {
            this.alertService.warning('Por favor ingresar la descripcion del producto');
            return;
        }

        let colores = this.Producto.colores;
        this.Producto.colores = [];
        let nombre_color = "";
        for (let i = 0; i < colores.length; i++) {
            nombre_color = jQuery('#nombre_' + i).val().replace(/\s/g, "_");
            this.Producto.colores.push({ nombre: nombre_color, color: jQuery('#color_' + i).val() });
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
            precio_usd: this.Producto.precio_usd,
            descripcion: this.Producto.descripcion,
            colores: this.Producto.colores,
            imagen: this.Producto.image,
            compra_min: this.Producto.compra_min,
            descuentos: this.Producto.descuentos,
            precio_ant: this.Producto.precio_ant,
            precio_ant_usd: this.Producto.precio_ant_usd,
            categoria_id: this.Producto.categoria_id,
            subcategoria_id: this.Producto.subcategoria_id,
            tags_id: this.tags.filter(o=> o.seleccionado).map(o=> o.id)
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
        this.productosService.saveImage(formData, (data: Result) => {
            loading_hide();
            if (data.isOk) {
                this.alertService.success(data.Mensaje);
                document.getElementById("image_galeria").innerHTML = '<div class="row">' +
                    '<div class="col-lg-12" style="text-align: center;">' +
                    '<i class="fa fa-image ico-bg"></i>' +
                    '</div>' +
                    '</div>';
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

    getCategorias() {
        loading_show();
        this.categoriasService.get((response) => {
            loading_hide();
            if (response.isOk) {
                this.categorias = response.Content;
            } else {
                this.alertService.error(response.Mensaje);
            }
        });
    }

    getSubcategorias() {
        loading_show();
        this.subcategoriasService.get(this.Producto.categoria_id, (response) => {
            loading_hide();
            if (response.isOk) {
                this.subcategorias = response.Content;
            } else {
                this.alertService.error(response.Mensaje);
            }
        });
    }

    getTags() {
        loading_show();
        this.tagsService.get((response) => {
            loading_hide();
            if (response.isOk) {
                this.tags = response.Content;
            } else {
                this.alertService.error(response.Mensaje);
            }
        });
    }

    viewMedidasPc(item) {
        this.Producto = item.propiedades;
    }

    viewMedidasMovil(item) {
        this.Producto = item.propiedades;
    }
    
    save_image_medidas_escritorio(event: any) {

        this.files_medidas_escritorio = event.target.files;
        for (var i = 0, f; f = this.files_medidas_escritorio[i]; i++) {
            if (!f.type.match('image.*')) {
                continue;
            }
            var reader = new FileReader();
            reader.onload = (function (theFile) {
                return function (e) {
                    document.getElementById("image_medidas_escritorio").innerHTML = ['<img class="animated bounceIn" style="width:100%;" src="', e.target.result, '" />'].join('');
                };
            })(f);
            reader.readAsDataURL(f);
        }

    }

    post_medidas_escritorio() {
        if (this.files_medidas_escritorio == null) {
            this.alertService.error("Cargar una imagen de la prenda");
            return;
        }

        var formData = new FormData();
        formData.append('imagen', this.files_medidas_escritorio[0]);
        formData.append('producto', JSON.stringify(this.Producto.id));

        loading_show();
        this.productosService.saveMedidasEscritorio(formData, (data: Result) => {
            loading_hide();
            if (data.isOk) {
                this.alertService.success(data.Mensaje);
                jQuery('#modalMedidasPc').modal('hide');
                this.files_medidas_escritorio = null;
            } else {
                this.alertService.error(data.Mensaje);
            }

        });
    }

    save_image_medidas_movil(event: any) {

        this.files_medidas_movil = event.target.files;
        for (var i = 0, f; f = this.files_medidas_movil[i]; i++) {
            if (!f.type.match('image.*')) {
                continue;
            }
            var reader = new FileReader();
            reader.onload = (function (theFile) {
                return function (e) {
                    document.getElementById("image_medidas_movil").innerHTML = ['<img class="animated bounceIn" style="width:100%;" src="', e.target.result, '" />'].join('');
                };
            })(f);
            reader.readAsDataURL(f);
        }

    }

    post_medidas_movil() {
        if (this.files_medidas_movil == null) {
            this.alertService.error("Cargar una imagen de la prenda");
            return;
        }

        var formData = new FormData();
        formData.append('imagen', this.files_medidas_movil[0]);
        formData.append('producto', JSON.stringify(this.Producto.id));

        loading_show();
        this.productosService.saveMedidasEscritorio(formData, (data: Result) => {
            loading_hide();
            if (data.isOk) {
                this.alertService.success(data.Mensaje);
                jQuery('#modalMedidasMovil').modal('hide');
                this.files_medidas_movil = null;
            } else {
                this.alertService.error(data.Mensaje);
            }

        });
    }

    
    
}