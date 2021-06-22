import { HttpCacheService } from './httpcache.service';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { ServersService } from './servers.service';

@Injectable()
export class CodigosDescuentosService {
    constructor(private http: HttpCacheService, private servers: ServersService) { }

    get(callback: any) {
        return this.http.get(0, this.servers.serverName + '/codigos-descuentos', callback);
    }

    post(codigoDescuento: any, callback: any) {
        return this.http.post(0, this.servers.serverName + '/codigos-descuentos', codigoDescuento, callback);
    }

    put(codigoDescuentoId: number,codigoDescuento: any, callback: any) {
        return this.http.put(0, this.servers.serverName + '/codigos-descuentos/' + codigoDescuentoId, codigoDescuento, callback);
    }

    delete(codigoDescuentoId: number, callback: any) {
        let request = {
            codigoDescuento_id: codigoDescuentoId
        }
        return this.http.post(0, this.servers.serverName + '/codigos-descuentos/delete', request, callback);
    }
}