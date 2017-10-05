import { Component, OnInit } from '@angular/core';
import { AlertService, FranquiciasService, UsuariosService } from "../../../services/base.import";
import { Result } from './../../../services/servers.service';
import { loading_show, loading_hide } from '../../../app.helpers';
declare var jQuery: any;

@Component({
    selector: 'taquilleros_crear',
    templateUrl: 'taquilleros.crear.template.html'
})
export class taquilleros_crear_component {
    constructor(
        private franquiciasService: FranquiciasService,
        private usuariosService: UsuariosService,
        private alertService: AlertService) {

    }
    public filter = "";
    public nUsers = 0;
    public users = [];
    public permisos = [];
    public franquicias = [];
    public template = true;
    public grupos = [];
    public selectFranquicia = "";
    public selectGrupo = "";
    public prefixFranquicia = "";
    public prefixManual = "";
    public countTaquillero = "";
    public taquilleros = [];
    public gruposTaqui = [];
    public userpass = {
        user:"",
        pass:"",
        codigo:0
    };
    public percent_recarga = 0;
    ngOnInit() {
        this.getFranquicias();

    }


    updateState(id:number, state:number) {
        loading_show();
        this.usuariosService.updateState(id, state, (data: Result) => {
            loading_hide();
            if (data.isOk) {
                this.alertService.success("Estado actualizado");
                this.getTaquilleros();
            }
        });
    }

    showBypassword(usuario:any) {
        this.userpass = usuario;
    }

    updatePassword(id:number) {
        loading_show();
        var object = {
            usuario_codigo: id,
            password: this.userpass['pass']
        }
        this.usuariosService.updatePassword(object, (data: Result) => {
            loading_hide();
            if (data.isOk) {
                this.alertService.success("Contraseña cambiada correctamente");
                jQuery('#myModal').modal('hide');
            }
        });
    }

    getTaquilleros() {
        loading_show();
        this.usuariosService.getTaquilleros(parseInt(this.selectGrupo), (data: Result) => {
            loading_hide();
            if (data.isOk) {
                this.taquilleros = data.Content;
            }
        })
    }

    getGruposTaquilleros() {
        loading_show();
        this.gruposTaqui.length = 0;
        this.franquiciasService.getGruposByFranquicia(parseInt(this.selectFranquicia), (data: Result) => {
            loading_hide();
            if (data.isOk) {
                for (var i = 0; i < data.Content.length; i++) {
                    if (data.Content[i].codigo !== -1) {
                        this.gruposTaqui.push(data.Content[i])
                    }
                }
                this.selectGrupo = this.gruposTaqui[0].codigo;
                this.getTaquilleros();
            }

        });
    }

    getFranquicias() {
        loading_show();
        this.franquiciasService.getAll((data: Result) => {
            loading_hide();
            if (data.isOk) {
                this.franquicias = data.Content;
                this.selectFranquicia = this.franquicias[0].codigo;
                this.getGrupos();
                this.getGruposTaquilleros();
            }
        });
    }

    calculatePrefixFranquicia() {
        for (var i = 0; i < this.franquicias.length; i++) {
            if (this.selectFranquicia == this.franquicias[i].codigo) {
                this.prefixFranquicia = this.franquicias[i].nombre.substr(0, 3).toLowerCase();
                break;
            }
        }

    }

    getGrupos() {
        this.calculatePrefixFranquicia();
        loading_show();
        this.grupos.length = 0;
        this.franquiciasService.getGruposByFranquicia(parseInt(this.selectFranquicia), (data: Result) => {
            loading_hide();
            if (data.isOk) {
                for (var i = 0; i < data.Content.length; i++) {
                    if (data.Content[i].codigo !== -1) {
                        this.grupos.push(data.Content[i])
                    }
                }
                this.selectGrupo = this.grupos[0].codigo;
                this.printUsers()
            }

        });
    }

    printUsers() {

        if (!this.prefixManual) {
            this.alertService.warning('Recuerda ingresar prefijo para crear usuarios...');
            return;
        }


        this.users.length = 0;
        var i = 0;

        var usuario = this.prefixFranquicia + "" + this.prefixManual;
        usuario = usuario.toLowerCase();

        loading_show();
        this.usuariosService.getLastTaquilleroByGrupo(parseInt(this.selectGrupo), usuario, (data: Result) => {
            loading_hide();
            if (data.isOk) {

                if (this.nUsers > 0) {
                    this.template = false;
                } else {
                    this.template = true;
                }
                this.countTaquillero = data.Content;
                for (i = 1; i <= this.nUsers; i++) {
                    this.users.push({ 'user': usuario + "" + (this.countTaquillero + i), 'pass': this.createpass(), 'grupo_codigo': this.selectGrupo, 'bono_recarga_percent': this.percent_recarga });
                }
            }
        })

    }

    createpass() {
        var pass = "";
        var abc = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "u", "v", "w", "x", "y", "z", "0", "2", "3", "4", "5", "6", "7", "8", "9"];
        var position = 0;
        for (var i = 0; i < 8; i++) {
            var random = Math.floor(Math.random() * (abc.length - 0));
            pass += abc[random];
        }
        return pass;

    }

    save() {
        loading_show();
        this.usuariosService.saveTaquilleros(this.users, (data: Result) => {
            loading_hide();
            if (data.isOk) {
                this.users.length = 0;
                this.alertService.success('Usuarios taquilleros creados correctamente');
                this.nUsers = 0;
                this.prefixManual = "";
                this.template = true;
            }else{
                this.alertService.error('No se han podido crear los usuarios');
            }
        })
    }
}