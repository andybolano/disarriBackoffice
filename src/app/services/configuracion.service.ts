import { HttpCacheService } from './httpcache.service';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { ServersService } from './../services/servers.service';

@Injectable()
export class ConfiguracionService {
    constructor(private http: HttpCacheService, private servers: ServersService) { }


    update(object:any, callback: any) {
        return this.http.post(0, this.servers.serverName + '/user/update',object, callback);
    }

    getNumeroWhatsapp(callback: any) {
        return this.http.get(0, this.servers.serverName + '/data-shared/phone', callback);
    }

}