import { HttpCacheService } from './httpcache.service';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { ServersService } from './../services/servers.service';

@Injectable()
export class BlogService {
    constructor(private http: HttpCacheService, private servers: ServersService) { }

    save(object: any, callback: any) {
        return this.http.post(0, this.servers.serverName + '/blog', object, callback);
    }

    getAll(callback: any) {
        return this.http.get(0, this.servers.serverName + '/blog', callback);
    }

    update(object:any,callback: any) {
        return this.http.post(0, this.servers.serverName + '/blog/update', object, callback);
    }

    eliminar(id:Number,callback: any){
        return this.http.get(0, this.servers.serverName + '/blog/delete/'+id, callback);
    }

     updateState(object:any,callback:any){
     return this.http.post(0, this.servers.serverName + '/blog/update/state',object,callback);
   }
}