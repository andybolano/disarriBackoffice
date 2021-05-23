import { HttpCacheService } from './httpcache.service';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { ServersService } from './../services/servers.service';

@Injectable()
export class BannerService {
    constructor(private http: HttpCacheService, private servers: ServersService) { }

    save(object: any, callback: any) {
        return this.http.post(0, this.servers.serverName + '/banner', object, callback);
    }

    getAll(callback: any) {
        return this.http.get(0, this.servers.serverName + '/banner', callback);
    }

    update(object:any,callback: any) {
        return this.http.post(0, this.servers.serverName + '/banner/update', object, callback);
    }

    eliminar(id:Number,callback: any){
        return this.http.get(0, this.servers.serverName + '/banner/delete/'+id, callback);
    }

     updateState(object:any,callback:any){
     return this.http.post(0, this.servers.serverName + '/banner/update/state',object,callback);
   }
}