import { HttpCacheService } from './httpcache.service';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { ServersService } from './../services/servers.service';

@Injectable()
export class UsuariosService {
 constructor(private http: HttpCacheService, private servers: ServersService) { }

    getUserbyId(id:number,callback: any){
       return this.http.get(0, this.servers.serverName + '/usuario/'+id, callback);
    }

    getUserbyPerfil(perfil: number,callback: any){
      return this.http.get(0, this.servers.serverName + '/usuario/rol/'+perfil, callback);
    }

    getTaquilleros(grupo: number,callback: any){
       return this.http.get(0, this.servers.serverName + '/usuario/taquilleros/'+grupo, callback);
    }
 
    getLastTaquilleroByGrupo(grupo:number,prefijo:String, callback: any) {
        return this.http.get(10, this.servers.serverName + '/usuario/lastindex/'+grupo+'/'+prefijo, callback);
   }

   saveTaquilleros(objetc:any, callback:any){
       return this.http.post(30, this.servers.serverName + '/usuario/taquilleros',objetc,callback);
   }
   saveUsuario(objetc:any, callback:any){
       return this.http.post(30, this.servers.serverName + '/usuario/new',objetc,callback);
   }

    updateUsuario(objetc:any, callback:any){
       return this.http.post(0, this.servers.serverName + '/usuario/update',objetc,callback);
   }

   updatePassword(object:any, callback:any){
        return this.http.post(0, this.servers.serverName + '/usuario/update/pass',object,callback);
   }

   updateState(codigo:number,estado:number, callback:any){
       var url =  this.servers.serverName + '/usuario/update/'+codigo+'/estado/'+ estado;
        return this.http.post(0,url,null,callback);
   }

}

