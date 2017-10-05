import { HttpCacheService } from './httpcache.service';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { ServersService } from './../services/servers.service';

@Injectable()
export class MercadosService {
 constructor(private http: HttpCacheService, private servers: ServersService) { }
 
    getMercado( callback: any) {
        return this.http.get(30, this.servers.serverName + '/oddstypes' ,callback);
   }
   updateMercado(object:any, callback: any) {
        return this.http.post(30, this.servers.serverName + '/oddstypes/update',object ,callback);
   }

}
