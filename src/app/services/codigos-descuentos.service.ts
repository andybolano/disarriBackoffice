import { HttpCacheService } from './httpcache.service';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { ServersService } from './servers.service';

@Injectable()
export class CodigosDescuentosService {
    constructor(private http: HttpCacheService, private servers: ServersService) { }

    get(callback: any) {
        return this.http.get(0, this.servers.serverName + '/promotion', callback);
    }

    post(codigoDescuento: any, callback: any) {
        return this.http.post(0, this.servers.serverName + '/promotion', codigoDescuento, callback);
    } 

    put(codigoDescuentoId: number,codigoDescuento: any, callback: any) {
        return this.http.put(0, this.servers.serverName + '/promotion/' + codigoDescuentoId, codigoDescuento, callback);
    }

    delete(codigoDescuentoId: number, callback: any) {
        let request = {
            id: codigoDescuentoId
        }
        return this.http.post(0, this.servers.serverName + '/promotion/delete', request, callback);
    }
}