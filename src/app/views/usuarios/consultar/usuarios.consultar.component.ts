import { Component , OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AlertService, PerfilesService, UsuariosService } from "../../../services/base.import";
import { Result } from './../../../services/servers.service';
import {loading_show, loading_hide} from '../../../app.helpers';
declare var jQuery:any;


@Component({
    selector: 'usuarios_consultar',
    templateUrl: 'usuarios.consultar.template.html'
})
export class usuarios_consultar_component { 
    constructor(private router: Router,
    private PerfilesService: PerfilesService,
     private usuariosService : UsuariosService,
    private alertService: AlertService){

    }


 ngOnInit(){
      this.getPerfiles();
  }
  
public filter = "";
public usuarios = [];
public perfiles = [];
public selectedPerfil = "";
public userpass = {
    codigo :0,
    user :"",
    pass:""
};

    getPerfiles(){
        loading_show();
        this.PerfilesService.getPerfiles((data: Result) => {
            loading_hide();
            if (data.isOk) {
            this.perfiles = data.Content;
            this.selectedPerfil = this.perfiles[0].codigo;
            this.getUsuarios();
            }

        });
    }

    getUsuarios(){
         loading_show();
        this.usuariosService.getUserbyPerfil(parseInt(this.selectedPerfil),(data: Result) => {
        loading_hide();
        if (data.isOk) {
            this.usuarios = data.Content
        }
      })
    }

    getUserById(id:number){
     loading_show();
        this.usuariosService.getUserbyId(id,(data: Result) => {
            loading_hide();
            if (data.isOk) {
                sessionStorage.setItem('editUser',(JSON.stringify(data.Content)));
                this.router.navigate(['usuarios/actualizar']);
            }
        });
    }

    updateState(id:number, state:number) {
        loading_show();
        this.usuariosService.updateState(id, state, (data: Result) => {
            loading_hide();
            if (data.isOk) {
                this.alertService.success("Estado actualizado");
                this.getUsuarios();
            }
        });
    }
    
    showBypassword(usuario:any){
        this.userpass = usuario;
    }

    updatePassword(id:number){
        loading_show();
        var object = {
            usuario_codigo:id,
            password:this.userpass['pass']
        }
            this.usuariosService.updatePassword(object,(data: Result) => {
                loading_hide();
                if (data.isOk) {
                      this.alertService.success("Contraseña cambiada correctamente");
                   jQuery('#myModal').modal('hide');
                }
            });
    }
}