import { HttpCacheService } from './httpcache.service';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { ServersService } from './../services/servers.service';

@Injectable()
export class VentasService {
    constructor(private http: HttpCacheService, private servers: ServersService) { }
    getPendientes(callback: any) {
        return this.http.get(0, this.servers.serverName + '/ventas', callback);
    }

    updateState(object:any,callback: any) {
        return this.http.post(0, this.servers.serverName + '/ventas/update/state',object, callback);
    }

     getByFechas(fechaInicial:String,fechaFinal:String,callback: any) {
        return this.http.get(0, this.servers.serverName + '/ventas/'+fechaInicial+"/"+fechaFinal, callback);
    }

     getProductosVenta(id:Number,callback: any) {
        return this.http.get(0, this.servers.serverName + '/ventas/productos/'+id+'/get', callback);
    }
}