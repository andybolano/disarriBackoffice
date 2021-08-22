import { HttpCacheService } from './httpcache.service';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { ServersService } from './servers.service';

@Injectable()
export class TiendasService {
    constructor(private http: HttpCacheService, private servers: ServersService) { }

    get(callback: any) {

        return this.http.get(0, this.servers.serverName + '/data-shared/tienda', callback);
    }

    update(tiendas: string,callback: any) {
        let request = {
            tiendas: tiendas
        };
        return this.http.post(0, this.servers.serverName + '/data-shared/tienda', request, callback);
    }

}