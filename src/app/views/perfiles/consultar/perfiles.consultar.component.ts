import { Component, OnInit } from '@angular/core';
import { AlertService, PerfilesService } from "../../../services/base.import";
import { Result } from '../../../services/servers.service';
import { loading_show, loading_hide } from '../../../app.helpers';
declare var jQuery: any;

@Component({
    selector: 'perfiles_consultar',
    templateUrl: 'perfiles.consultar.template.html'
})
export class perfiles_consultar_component {
    constructor(private PerfilesService: PerfilesService, private alertService: AlertService) { }


    ngOnInit() {
        this.getPerfiles();
    }

    public perfiles = [];
    public permisos = [];
    public namePerfilSelect = "";
    public selectedPerfil = "";

    getPerfiles() {
        loading_show();
        this.PerfilesService.getPerfiles((data: Result) => {
            if (data.isOk) {
                this.perfiles = data.Content;
                this.selectedPerfil = this.perfiles[0].codigo;
                this.getPermisos();  //Consulto los permisos registrados en el sistema
            }

        });
    }

    getPermisos() {
        this.PerfilesService.getPermisos((data: Result) => {
            if (data.isOk) {
                this.permisos = data.Content;
                this.getPermisosByPerfil(this.perfiles[0].codigo) //consulto lo permisos que tiene el perfil en la posicion 0
            }

        });
    }

    getPermisosByPerfil(perfil:any) {
        loading_show();
        var i = 0;
        for (i = 0; i <= this.perfiles.length; i++) {
            if (perfil == this.perfiles[i].codigo) {
                this.namePerfilSelect = this.perfiles[i].nombre;
                break;
            }
        }
        jQuery("input[type=checkbox]").prop('checked', false);

        this.PerfilesService.getPermisosByperfil(perfil, (data: Result) => {
            loading_hide();
            if (data.isOk) {
                var i = 0;
                console.log(data.Content)
                for (i = 0; i < data.Content.length; i++) {
                    jQuery('#get-' + data.Content[i].codigo).prop('checked', true); //selecciono los permisos que tiene el perfil
                }

                //aplicando el estilo a los checkbox
                jQuery('.checks-consulta').iCheck({
                    checkboxClass: 'icheckbox_square-green',
                    radioClass: 'iradio_square-green',
                });
            }
        });

    }

    updatePerfil() {
        var arrayPermisos = [];
        jQuery('input[name="PermisosGet"]:checked').each(function () {
            var id = this.id.replace(/\D/g, '');
            arrayPermisos.push(parseInt(id));
        });

        var object =
            {
                codigo: this.selectedPerfil,
                permisos: arrayPermisos
            }
        loading_show();
        this.PerfilesService.updatePerfil(object, (data: Result) => {
            loading_hide();
            if (data.isOk) {
                this.alertService.success("Perfil actualizado correctamente");
                return;
            }
        });
    }



}