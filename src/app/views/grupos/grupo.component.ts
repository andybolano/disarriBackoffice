import { Component, OnInit } from '@angular/core';
import { AlertService, GruposService, FranquiciasService } from "../../services/base.import";
import { Result } from './../../services/servers.service';
import { loading_show, loading_hide } from '../../app.helpers';

@Component({
    selector: 'grupos',
    templateUrl: 'grupo.template.html'
})
export class grupos_component implements OnInit {
    constructor(
        private gruposService: GruposService,
        private franquiciasService: FranquiciasService,
        private alertService: AlertService
    ) {

    }



    ngOnInit() {
        this.getFranquicias();
        this.getAll();
    }



    public grupo = {
        franquicia_codigo:0,
        nombre: "",
        regalia:0,
        proporcion:0,
        inversionMin:0,
        inversionMax:0,
        jugadasMin:0,
        jugadasMax:0,
        caducidad:0,
        combinadas:0,
        gananciaMax:0,
        gananciaMin:0,
        recargaMin:0,
        estado:0
    };
    public filter = "";
    public grupos = [];
    public franquicias = [];
    public update = false;
    files: FileList;
    getFranquicias() {
        loading_show();
        this.franquiciasService.getAll((data: Result) => {
            loading_hide();
            if (data.isOk) {
                this.franquicias = data.Content;
            }

        });
    }

    getAll() {
        loading_show();
        this.gruposService.getAll((data: Result) => {
            loading_hide();
            if (data.isOk) {
                this.grupos = data.Content;
                this.grupo = this.grupos[0];
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
                    document.getElementById("image").innerHTML = ['<img class="animated bounceIn" style="width:60%; margin-left:20%" src="', e.target.result, '" />'].join('');
                };
            })(f);
            reader.readAsDataURL(f);
        }
    }

    saveGrupo() {
        let formData: FormData = new FormData();

        if (!this.files) {
            this.alertService.warning('por favor cargar logo del grupo');
            return;
        }

        if (!this.grupo['franquicia_codigo']) {
            this.alertService.warning('por escoger franquicia a la que pertenece el grupo');
            return;
        }

        if (!this.grupo['estado']) {
            this.grupo['estado'] = 1;
        }

        formData.append('imagen', this.files[0]);


        var object = {
            'franquicia_codigo': this.grupo['franquicia_codigo'],
            'nombre': this.grupo['nombre'],
            'regalia': this.grupo['regalia'],
            'proporcion': this.grupo['proporcion'],
            'inversionMin': this.grupo['inversionMin'],
            'inversionMax': this.grupo['inversionMax'],
            'gananciaMax': this.grupo['gananciaMax'],
            'jugadasMax': this.grupo['jugadasMax'],
            'jugadasMin': this.grupo['jugadasMin'],
            'recargaMin': this.grupo['recargaMin'],
            'caducidad': this.grupo['caducidad'],
            'combinadas': this.grupo['combinadas'],
            'estado': this.grupo['estado'],
        }

        formData.append('grupo', JSON.stringify(object));

        loading_show();
        this.gruposService.save(formData, (data: Result) => {
            loading_hide();

            if (data.isOk) {
                this.getAll();
                this.grupo = this.grupos[0];
                this.alertService.success(data.Mensaje);
            }
        });

    }

    showGrupo(grupo: any) {
        this.grupo = grupo;
        this.update = true;
        if (grupo.ruta_icon) {
            document.getElementById("image").innerHTML = ['<img class="animated bounceIn" style="width:60%; margin-left:20%" src="http://backoffice.luxorcolombia.com/' + grupo.ruta_icon + '" />'].join('');
        } else {
            document.getElementById("image").innerHTML = '<div class="row">' +
                '<div class="col-lg-12" style="text-align: center;">' +
                '<i class="fa fa-image ico-bg"></i>' +
                '</div>' +
                '</div>';
        }
    }


    cancel() {
        this.grupo = this.grupos[0];
        this.update = false;
        document.getElementById("image").innerHTML = '<div class="row">' +
            '<div class="col-lg-12" style="text-align: center;">' +
            '<i class="fa fa-image ico-bg"></i>' +
            '</div>' +
            '</div>';
    }

    updateGrupo() {
        let formData: FormData = new FormData();

        if (this.files) {
            formData.append('imagen', this.files[0]);
        }

        if (!this.grupo['franquicia_codigo']) {
            this.alertService.warning('por escoger franquicia a la que pertenece el grupo');
            return;
        }

        if (!this.grupo['estado']) {
            this.grupo['estado'] = 1;
        }




        var object = {
            'franquicia_codigo': this.grupo['franquicia_codigo'],
            'nombre': this.grupo['nombre'],
            'regalia': this.grupo['regalia'],
            'proporcion': this.grupo['proporcion'],
            'inversionMin': this.grupo['inversionMin'],
            'inversionMax': this.grupo['inversionMax'],
            'gananciaMax': this.grupo['gananciaMax'],
            'jugadasMax': this.grupo['jugadasMax'],
            'jugadasMin': this.grupo['jugadasMin'],
            'recargaMin': this.grupo['recargaMin'],
            'caducidad': this.grupo['caducidad'],
            'combinadas': this.grupo['combinadas'],
            'estado': this.grupo['estado'],
            'codigo': this.grupo['codigo']
        }

        formData.append('grupo', JSON.stringify(object));

        loading_show();
        this.gruposService.update(formData, (data: Result) => {
            loading_hide();
            if (data.isOk) {
                this.update = false;
                this.getAll();
                this.grupo = this.grupos[0];
                this.alertService.success(data.Mensaje);
                document.getElementById("image").innerHTML = '<div class="row">' +
                    '<div class="col-lg-12" style="text-align: center;">' +
                    '<i class="fa fa-image ico-bg"></i>' +
                    '</div>' +
                    '</div>';
            }
        });
    }


    updateState(id: number, state: number) {
        loading_show();
        this.gruposService.updateState(id, state, (data: Result) => {
            loading_hide();
            if (data.isOk) {
                this.alertService.success("Estado actualizado");
                this.getAll();
            }
        });
    }
}