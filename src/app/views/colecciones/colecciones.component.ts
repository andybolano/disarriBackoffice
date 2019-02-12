
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
    public updateItem = false;

    public Item = {
        id: 0,
        nombre: "",
        subtitulo:"",
        descripcion:"",
        estado:"",
        imagen:""

    };

    public Coleccion = {
        id: 0,
        nombre: "",
        descripcion:"",
        estado:"",
        imagen:""

    };

  


    files: FileList;
    filesItem: FileList;
    public filter = "";
    public colecciones = [];
    public items = [];
    public images = [];

    nuevo() {
        this.update = false;
        this.Coleccion = {
            id: 0,
            nombre: "",
            descripcion:"",
            estado:"",
            imagen:""
        };

        document.getElementById("image").innerHTML = '<div class="row">' +
        '<div class="col-lg-12" style="text-align: center;">' +
        '<i class="fa fa-image ico-bg"></i>' +
        '</div>' +
        '</div>';
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

        
        let formData: FormData = new FormData();
        if (!this.Coleccion.nombre || this.Coleccion.descripcion == "") {
            this.alertService.warning('Por favor ingresar el nombre del producto');
            return;
        }
       
        if (!this.files) {
            this.alertService.warning('Por favor cargar la imagen de la coleccion');
            return;
        }
    
        
      
        var object = {
            nombre: this.Coleccion.nombre,
            descripcion: this.Coleccion.descripcion,
        }
        formData.append('imagen', this.files[0]);
        formData.append('coleccion', JSON.stringify(object));
        loading_show();


        this.coleccionService.save(formData, (data: Result) => {
            loading_hide();
            if (data.isOk) {
           
                this.alertService.success(data.Mensaje);
                document.getElementById("image").innerHTML = '<div class="row">' +
                    '<div class="col-lg-12" style="text-align: center;">' +
                    '<i class="fa fa-image ico-bg"></i>' +
                    '</div>' +
                    '</div>';
                this.Coleccion = {
                    id: 0,
                    nombre: "",
                    descripcion:"",
                    estado:"",
                    imagen:""

                };
              
                this.getAll();
            } else {
                this.alertService.error(data.Mensaje);
            }
        });
    }

    editShow(item) {
        this.update = true;
        this.Coleccion = item;
        document.getElementById("image").innerHTML = ['<img class="animated bounceIn" style="width:60%;" src="' + item.imagen + '" />'].join('');
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
        let formData: FormData = new FormData();
        if (!this.Coleccion.nombre || this.Coleccion.descripcion == "") {
            this.alertService.warning('Por favor ingresar el nombre del producto');
            return;
        }
     
      
        var object = {
            id: this.Coleccion.id,
            nombre: this.Coleccion.nombre,
            descripcion: this.Coleccion.descripcion,
            imagen:this.Coleccion.imagen
        }

        if (!this.files) {

        } else {
            formData.append('imagen', this.files[0]);
        }

        formData.append('coleccion', JSON.stringify(object));
        loading_show();
        jQuery('#modificar').attr("disabled", true);
        loading_show();

        this.coleccionService.update(formData, (data: Result) => {
            loading_hide();
            if (data.isOk) {
                jQuery('#modificar').attr("disabled", false);
                jQuery('#modalColeccion').modal('hide');
                this.Coleccion = {
                    id: 0,
                    nombre: "",
                    descripcion:"",
                    estado:"",
                    imagen:""

                };
                this.alertService.success(data.Mensaje);
                this.getAll();
            } else {
                this.alertService.error(data.Mensaje);
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
        this.coleccionService.updateOrden(object, (data: Result) => {
            loading_hide();
            if (data.isOk) {
                this.alertService.success('Orden cambiado correctamente')
            }

        });
    }


    editShowItems(item) {
        this.updateItem = false;
        this.Coleccion = item;
        this.Item = {
            id: 0,
            nombre: "",
            subtitulo:"",
            descripcion:"",
            estado:"",
            imagen:""

        };
        this.getAllItems(item.id)
    }

    saveItem(){

        let formData: FormData = new FormData();
        if (!this.Item.nombre || this.Item.descripcion == "") {
            this.alertService.warning('Por favor ingresar el nombre del producto');
            return;
        }
       
        if (!this.filesItem) {
            this.alertService.warning('Por favor cargar la imagen de la coleccion');
            return;
        }
    
        
      
        var object = {
            nombre: this.Item.nombre,
            subtitulo: this.Item.subtitulo,
            descripcion: this.Item.descripcion,
            id_coleccion:this.Coleccion.id
        }
        formData.append('imagen', this.filesItem[0]);
        formData.append('item', JSON.stringify(object));
        loading_show();


        this.coleccionService.saveItem(formData, (data: Result) => {
            loading_hide();
            if (data.isOk) {
           
                this.alertService.success(data.Mensaje);
                document.getElementById("imageItem").innerHTML = '<div class="row">' +
                    '<div class="col-lg-12" style="text-align: center;">' +
                    '<i class="fa fa-image ico-bg"></i>' +
                    '</div>' +
                    '</div>';
                this.Item = {
                    id: 0,
                    nombre: "",
                    subtitulo:"",
                    descripcion:"",
                    estado:"",
                    imagen:""

                };
              
                this.getAllItems(this.Coleccion.id);
            } else {
                this.alertService.error(data.Mensaje);
            }
        });

    }

    getAllItems(id){
        loading_show();
        this.coleccionService.getAllItems(id,(data: Result) => {
            loading_hide();
            if (data.isOk) {
                this.items = data.Content;
            } else {
                this.alertService.error(data.Mensaje);
            }

        });
    }

    getFilesItem(event: any) {
        this.filesItem = event.target.files;

        for (var i = 0, f; f = this.filesItem[i]; i++) {
            if (!f.type.match('image.*')) {
                continue;
            }
            var reader = new FileReader();
            reader.onload = (function (theFile) {
                return function (e) {
                    document.getElementById("imageItem").innerHTML = ['<img class="animated bounceIn" style="width:60%;" src="', e.target.result, '" />'].join('');
                };
            })(f);
            reader.readAsDataURL(f);
        }
    }

    editShowItem(item){
        this.Item = item;
        this.updateItem = true;
        document.getElementById("imageItem").innerHTML = ['<img class="animated bounceIn" style="width:60%;" src="' + item.imagen + '" />'].join('');
    }

    updateEstadoItem(state: Number, item: any) {
        loading_show();
        item.estado = state;
        this.coleccionService.updateStateItem(item, (data: Result) => {
            loading_hide();
            if (data.isOk) {
                this.alertService.success(data.Mensaje)
            }

        });
    }

    changeOrdenItem(id, orden){
        loading_show();
        if(orden == ""){
            return;
        }
        var object = {
            id:id,
            orden:orden
        }
        this.coleccionService.updateOrdenItem(object, (data: Result) => {
            loading_hide();
            if (data.isOk) {
                this.alertService.success('Orden cambiado correctamente')
            }

        });
    }

    deleteItem(id: number) {

        var element = document.getElementById("wrapper");
        element.classList.add("blur");

        swal({
            title: 'Esta seguro?',
            text: "Desea realmente eliminar este item? ",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar!',
            cancelButtonText: 'Cancelar',
            allowOutsideClick: false
        }).then(() => {

            loading_show();
            this.coleccionService.eliminarItem(id, (data: Result) => {
                loading_hide();
                if (data.isOk) {
                    swal(
                        'Realizado!',
                        data.Mensaje,
                        'success'
                    )
                    this.getAllItems(this.Coleccion.id);
                }

            });
        }).catch(swal.noop)

    }

    updateItems(){

        let formData: FormData = new FormData();
        if (!this.Item.nombre || this.Item.descripcion == "") {
            this.alertService.warning('Por favor ingresar el nombre del producto');
            return;
        }
       
        if (!this.filesItem) {

        } else {
            formData.append('imagen', this.filesItem[0]);
        }

        
      
        var object = {
            id:this.Item.id,
            nombre: this.Item.nombre,
            subtitulo: this.Item.subtitulo,
            descripcion: this.Item.descripcion,
            imagen:this.Item.imagen
        }
  
        formData.append('item', JSON.stringify(object));
       // loading_show();


        this.coleccionService.updateItem(formData, (data: Result) => {
            loading_hide();
            if (data.isOk) {
           
                this.alertService.success(data.Mensaje);
                document.getElementById("imageItem").innerHTML = '<div class="row">' +
                    '<div class="col-lg-12" style="text-align: center;">' +
                    '<i class="fa fa-image ico-bg"></i>' +
                    '</div>' +
                    '</div>';
                this.Item = {
                    id: 0,
                    nombre: "",
                    subtitulo:"",
                    descripcion:"",
                    estado:"",
                    imagen:""

                };
              
                this.getAllItems(this.Coleccion.id);
            } else {
                this.alertService.error(data.Mensaje);
            }
        });

    }



  

    





}