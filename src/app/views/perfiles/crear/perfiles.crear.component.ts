import { Component, OnInit } from '@angular/core';
import { AlertService, PerfilesService } from "../../../services/base.import";
import { Result } from '../../../services/servers.service';
import { loading_show, loading_hide } from '../../../app.helpers';
declare var jQuery: any;

@Component({
    selector: 'perfiles_crear',
    templateUrl: 'perfiles.crear.template.html'
})


export class perfiles_crear_component implements OnInit {
    constructor(
        private PerfilesService: PerfilesService,
        private alertService: AlertService) {

    }


    ngOnInit() {
        this.getPermisos();
    }


    public permisos = [];
    public permiso = {
        nombre:""
    };


    savePerfil() {
        if (!this.permiso['nombre']) {
            this.alertService.warning('Ingresar nombre del perfil...');
            return;
        }
        var Npermisos = jQuery('input[name="PermisosAdd"]:checked').length;
        if (Npermisos === 0) {
            this.alertService.warning('No hay permisos asignados al perfil...');
            return;
        }

        var arrayPermisos = [];
        jQuery('input[name="PermisosAdd"]:checked').each(function () {
            var id = this.id.replace(/\D/g, '');
            arrayPermisos.push(parseInt(id));
        });

        var object = {
            nombre: this.permiso['nombre'],
            permisos: arrayPermisos
        }


        loading_show();
        this.PerfilesService.savePerfil(object, (data: Result) => {
            loading_hide();
            if (data.isOk) {
                this.permiso['nombre'] = "";
                jQuery("input[name='PermisosAdd']").prop('checked', false);
                this.alertService.success("Perfil guardado correctamente");
                this.printCheck();
            }
        });
    }

    getPermisos() {
        loading_show();
        this.PerfilesService.getPermisos((data: Result) => {
            loading_hide();
            if (data.isOk) {
                this.permisos = data.Content;
                this.printCheck();
            }

        });
    }

    printCheck() {
        setTimeout(function () {
            jQuery('.checks-crear').iCheck({
                checkboxClass: 'icheckbox_square-green',
                radioClass: 'iradio_square-green',
            });
        }, 100)
    }

}

