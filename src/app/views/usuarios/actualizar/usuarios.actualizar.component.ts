import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService, PerfilesService, UsuariosService, GruposService } from "../../../services/base.import";
import { Result } from './../../../services/servers.service';
import { loading_show, loading_hide } from '../../../app.helpers';
declare var jQuery: any;


@Component({
    selector: 'usuarios_actualizar',
    templateUrl: 'usuario.actualizar.template.html'
})
export class usuarios_actualizar_component {
    constructor(
        private router: Router,
        private PerfilesService: PerfilesService,
        private usuariosService: UsuariosService,
        private gruposService: GruposService,
        private alertService: AlertService) {

    }


    ngOnInit() {
        this.getUser();
        this.getPermisos();
    }

    public usuario = {
        user:'',
        info:'',
    };
    public filterPermiso = "";
    public perfiles = [];
    public permisos = [];
    public grupos = [];
    public selectedPerfil = "";

    getUser() {
        this.usuario = JSON.parse(sessionStorage.getItem('editUser'));
        this.getPerfiles();
        this.getGrupos();
    }

    getPermisos() {
        loading_show();
        this.PerfilesService.getPermisos((data: Result) => {
            loading_hide();
            if (data.isOk) {
                this.permisos = data.Content;
                setTimeout(() => {
                    this.getMisPermisos();
                }, 200)

            }
        });
    }

    getMisPermisos() {
        var permisos = this.usuario['Permisos'];
        var i = 0;
        for (i = 0; i < permisos.length; i++) {
            jQuery('#' + permisos[i]).prop('checked', true); //selecciono los permisos que tiene el perfil
        }
        setTimeout(function () {
            jQuery('.i-checks').iCheck({
                checkboxClass: 'icheckbox_square-green',
                radioClass: 'iradio_square-green',
            });
        }, 100)
    }

    getPermisosByPerfil() {
        loading_show();
        jQuery("input[type=checkbox]").prop('checked', false);
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


    getGrupos() {
        var band = false;
        loading_show();
        this.grupos.length = 0;
        this.gruposService.getAll((data: Result) => {
            loading_hide();
            if (data.isOk) {
                this.grupos = data.Content;
                var gruposAdd = this.usuario['Grupos'];
                for (var i = 0; i < this.grupos.length; i++) {
                    if (this.grupos[i].codigo !== -1) {
                        for (var y = 0; y < gruposAdd.length; y++) {
                            if (gruposAdd[y] == this.grupos[i].codigo) {
                                band = true;
                                break;
                            }
                        }
                        if (band) {
                            jQuery("#grupos").append('<option value=' + this.grupos[i].codigo + ' selected>' + this.grupos[i].nombre + '</option>');
                            band = false;

                        } else {
                            jQuery("#grupos").append('<option value=' + this.grupos[i].codigo + '>' + this.grupos[i].nombre + '</option>');
                        }
                    }
                }
                jQuery('select[name="grupos_list[]"]').bootstrapDualListbox();
            }



        });
    }

    getPerfiles() {
        loading_show();
        this.PerfilesService.getPerfiles((data: Result) => {
            loading_hide();
            if (data.isOk) {
                this.perfiles = data.Content;
                this.selectedPerfil = this.usuario['role_codigo'];
            }

        });
    }

    cancel() {
        sessionStorage.removeItem('editUser');
        this.router.navigate(['usuarios/consultar']);
    }

    update() {
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

        var g = jQuery('[name="grupos_list[]"]').val();
        var i = 0;
        var grupos = [];
        for (i = 0; i < g.length; i++) {
            grupos.push(parseInt(g[i]));
        }

        var usuario = {
            codigo: this.usuario['codigo'],
            user: this.usuario['user'],
            info: this.usuario['info'],
            role_codigo: this.selectedPerfil,
            Permisos: permisos,
            Grupos: grupos
        }


        loading_show();
        this.usuariosService.updateUsuario(usuario, (data: Result) => {
            loading_hide();

            if (data.isOk) {
                this.usuario = {
                    user:'',
                    info:'',
                };
                this.alertService.success('Usuario actualizado correctamente');
                this.router.navigate(['usuarios/consultar']);
            }
        })
    }


}