import { HttpCacheService } from './httpcache.service';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { ServersService } from './../services/servers.service';

@Injectable()
export class ColeccionService {
    constructor(private http: HttpCacheService, private servers: ServersService) { }

    save(object: any, callback: any) {
        return this.http.post(0, this.servers.serverName + '/coleccion', object, callback);
    }

    getAll(callback: any) {
        return this.http.get(0, this.servers.serverName + '/coleccion', callback);
    }

    update(object:any,callback: any) {
        return this.http.post(0, this.servers.serverName + '/coleccion/update', object, callback);
    }

<<<<<<< HEAD
    updateOrden(object,callback:any){
        return this.http.post(0, this.servers.serverName + '/coleccion/update/orden',object,callback);
      }

=======
>>>>>>> d0cc4a29bccc6ce7e8791a92a111c7ecdd3d657e
    eliminar(id:Number,callback: any){
        return this.http.get(0, this.servers.serverName + '/coleccion/delete/'+id, callback);
    }

     updateState(object:any,callback:any){
     return this.http.post(0, this.servers.serverName + '/coleccion/update/state',object,callback);
   }

   getImages(id:Number, callback:any){
     return this.http.get(0, this.servers.serverName + '/coleccion/images/'+id,callback);
   }

    saveImage(object, callback:any){
     return this.http.post(0, this.servers.serverName + '/coleccion/images',object,callback);
   }

   deleteImage(object, callback:any){
     return this.http.post(0, this.servers.serverName + '/coleccion/images/delete',object,callback);
   }

}