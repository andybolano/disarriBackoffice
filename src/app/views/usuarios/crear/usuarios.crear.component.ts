import { Component, OnInit } from '@angular/core';
import { AlertService, PerfilesService, GruposService, UsuariosService } from "../../../services/base.import";
import { Result } from './../../../services/servers.service';
import { loading_show, loading_hide } from '../../../app.helpers';
declare var jQuery: any;

@Component({
    selector: 'usuarios_crear',
    templateUrl: 'usuarios.crear.template.html'
})
export class usuarios_crear_component {
    constructor(
        private PerfilesService: PerfilesService,
        private gruposService: GruposService,
        private usuariosService: UsuariosService,
        private alertService: AlertService) {

    }
    public usuario = {
        user:"",
        pass:"",
        info:""
    };
    public filterPermiso = "";
    public permisos = [];
    public franquicias = [];
    public perfiles = [];
    public grupos = [];
    public selectFranquicia = "";
    public selectGrupo = "";
    public selectedPerfil = "";


    ngOnInit() {
        this.getPerfiles();
        this.getPermisos();
        this.getGrupos();
    }

    getPerfiles() {
        loading_show();
        this.PerfilesService.getPerfiles((data: Result) => {
            if (data.isOk) {
                loading_hide();
                this.perfiles = data.Content;
                this.selectedPerfil = this.perfiles[0].codigo;
                this.getPermisosByPerfil();
            }
        });
    }


    getPermisos() {
        loading_show();
        this.PerfilesService.getPermisos((data: Result) => {
            loading_hide();
            if (data.isOk) {
                this.permisos = data.Content;

            }
        });
    }

    getGrupos() {
        loading_show();
        this.grupos.length = 0;
        this.gruposService.getAll((data: Result) => {
            loading_hide();
            if (data.isOk) {
                this.grupos = data.Content;
                for (var i = 0; i < this.grupos.length; i++) {
                    if (this.grupos[i].codigo !== -1) {
                        jQuery("#grupos").append(jQuery('<option>', {
                            value: this.grupos[i].codigo,
                            text: this.grupos[i].nombre
                        }));
                    }
                }
                setTimeout(function () {
                    jQuery('select[name="grupos_list[]"]').bootstrapDualListbox();
                }, 100);
            }

        });
    }

    getPermisosByPerfil() {
        loading_show();
        jQuery("input[type=checkbox]").prop('checked', false);
        console.log(this.selectedPerfil)
        this.PerfilesService.getPermisosByperfil(parseInt(this.selectedPerfil), (data: Result) => {
            loading_hide();
            if (data.isOk) {
                var i = 0;
                for (i = 0; i < data.Content.length; i++) {
                    jQuery('#' + data.Content[i].codigo).prop('checked', true); //selecciono los permisos que tiene el perfil
                }
                setTimeout(function () {
                    jQuery('.i-checks').iCheck({
                        checkboxClass: 'icheckbox_square-green',
                        radioClass: 'iradio_square-green',
                    });
                }, 100)
            }
        });

    }

    save() {
        var permisos = [];


        if (!this.usuario['user']) {
            this.alertService.warning("Ingresar usuario");
            return false;
        }
        if (!this.usuario['pass']) {
            this.alertService.warning("Ingresar Contraseña");
            return false;
        }

        jQuery('input[name="PermisosAdd[]"]:checked').each(function () {
            permisos.push(parseInt(this.id));
        });

        var grupos = jQuery('[name="grupos_list[]"]').val();

        var usuario = {
            user: this.usuario['user'],
            pass: this.usuario['pass'],
            info: this.usuario['info'],
            role_codigo: this.selectedPerfil,
            estado: 1,
            Permisos: permisos,
            Grupos: grupos
        }

        loading_show();
        this.usuariosService.saveUsuario(usuario, (data: Result) => {
            loading_hide();
            console.log(data)
            if (data.isOk) {
                this.usuario = {
        user:"",
        pass:"",
        info:""
    };
                this.alertService.success('Usuario creado correctamente');
            }
        })
    }

}