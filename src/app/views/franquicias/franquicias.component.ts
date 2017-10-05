import { Component, OnInit } from '@angular/core';
import { AlertService, FranquiciasService } from "../../services/base.import";
import { Result } from './../../services/servers.service';
import { loading_show, loading_hide } from '../../app.helpers';

@Component({
    selector: 'franquicias',
    templateUrl: 'franquicias.template.html'
})
export class franquiciasComponent {

    constructor(
        private franquiciasService: FranquiciasService,
        private alertService: AlertService) {
    }


    ngOnInit() {
        this.getFranquicias();
    }

    public filter = "";
    public franquicias = [];
    public franquicia = {
        nombre : "",
        dominio:"",
        limite_usuarios : 0,
        estado:0,
    };
    public update = false;

    getFranquicias() {
        loading_show();
        this.franquiciasService.getAll((data: Result) => {
            loading_hide();
            if (data.isOk) {
                this.franquicias = data.Content;
            }

        });
    }

    showFranquicia(franquicia: any) {
        this.franquicia = franquicia;
        this.update = true;
    }

    cancel() {
        this.franquicia = {
        nombre : "",
        dominio:"",
        limite_usuarios : 0,
        estado:0,
    };
        this.update = false;
    }

    updateFranquicia() {
        if (!this.franquicia['nombre']) {
            this.alertService.warning('Ingresar nombre de la franquicia...');
            return;
        }
        if (!this.franquicia['dominio']) {
            this.alertService.warning('Ingresar dominio de la franquicia...');
            return;
        }
        if (!this.franquicia['estado']) {
            this.alertService.warning('Ingresar estado de la franquicia...');
            return;
        }
        if (!this.franquicia['limite_usuarios']) {
            this.franquicia['limite_usuarios'] = -1;
        }

        var object = {
            codigo: this.franquicia['codigo'],
            nombre: this.franquicia['nombre'],
            dominio: this.franquicia['dominio'],
            estado: this.franquicia['estado'],
            limite_usuarios: this.franquicia['limite_usuarios']
        }
        loading_show();
        this.franquiciasService.update(object, (data: Result) => {
            loading_hide();
            console.log(data)
            if (data.isOk) {
                this.getFranquicias();
                this.franquicia = {
                    nombre : "",
                    dominio:"",
                    limite_usuarios : 0,
                    estado:0,
                };
                this.update = false;
                this.alertService.success('Franquicia actualizada correctamente');
                return;
            }
        });
    }

    saveFranquicia() {
        if (!this.franquicia['nombre']) {
            this.alertService.warning('Ingresar nombre de la franquicia...');
            return;
        }
        if (!this.franquicia['dominio']) {
            this.alertService.warning('Ingresar dominio de la franquicia...');
            return;
        }
        if (!this.franquicia['estado']) {
            this.alertService.warning('Ingresar estado de la franquicia...');
            return;
        }
        if (!this.franquicia['limite_usuarios']) {
            this.franquicia['limite_usuarios'] = -1;
        }

        var object = {
            nombre: this.franquicia['nombre'],
            dominio: this.franquicia['dominio'],
            estado: this.franquicia['estado'],
            limite_usuarios: this.franquicia['limite_usuarios']
        }

        loading_show();
        this.franquiciasService.save(object, (data: Result) => {
            loading_hide();

            if (data.isOk) {
                this.getFranquicias();
                this.franquicia = {
                    nombre : "",
                    dominio:"",
                    limite_usuarios : 0,
                    estado:0,
                };
                this.alertService.success('Franquicia guardada correctamente');
                return;
            }
        });
    }

    updateState(id: number, state: number) {
        loading_show();
        this.franquiciasService.updateState(id, state, (data: Result) => {
            loading_hide();
            if (data.isOk) {
                this.alertService.success("Estado actualizado");
                this.getFranquicias();
            }
        });
    }
}