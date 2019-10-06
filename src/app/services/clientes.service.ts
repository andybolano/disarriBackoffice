import { HttpCacheService } from './httpcache.service';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { ServersService } from './../services/servers.service';

@Injectable()
export class ClientesService {
    constructor(private http: HttpCacheService, private servers: ServersService) { }
    getAll(callback: any) {
        return this.http.get(0, this.servers.serverName + '/clientes', callback);
    }
}