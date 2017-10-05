import { HttpCacheService } from './httpcache.service';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { ServersService } from './../services/servers.service';

@Injectable()
export class VentasService {
    constructor(private http: HttpCacheService, private servers: ServersService) { }

    getReporteByGrupos(fechaInicio: String, fechaFin: String, callback: any) {
        return this.http.get(30, this.servers.serverName + '/tickets/grupos/balance/' + fechaInicio + '/' + fechaFin, callback);
    }

    getUsuariosByGrupo(idGrupo: number, fechaInicio: String, fechaFin: String, callback: any) {
        return this.http.get(30, this.servers.serverName + '/tickets/grupos/' + idGrupo + '/balance/' + fechaInicio + '/' + fechaFin, callback);
    }

    getTicketsByTaquilla(id: number, estado: number, fechaInicio: String, fechaFin: String, callback: any) {
        console.log(estado)
        if (estado == -1) {
            var url = this.servers.serverName + '/tickets/usuario/' + id + '/' + fechaInicio + '/' + fechaFin + '/estado';
        } else if (estado == 7) {
            var url = this.servers.serverName + '/tickets/usuario/' + id + '/' + fechaInicio + '/' + fechaFin + '/ganadores';
        } else {
            var url = this.servers.serverName + '/tickets/usuario/' + id + '/' + fechaInicio + '/' + fechaFin + '/estado/' + estado;
        }
        return this.http.get(30, url, callback);
    }
    getTicketsByGrupo(id: number, estado: number, fechaInicio: String, fechaFin: String, callback: any) {
        if (estado == -1) {
            var url = this.servers.serverName + '/tickets/grupo/' + id + '/' + fechaInicio + '/' + fechaFin + '/estado';
        } else if (estado == 7) {
            var url = this.servers.serverName + '/tickets/grupo/' + id + '/' + fechaInicio + '/' + fechaFin + '/ganadores';
        } else {
            var url = this.servers.serverName + '/tickets/grupo/' + id + '/' + fechaInicio + '/' + fechaFin + '/estado/' + estado;
        }
        return this.http.get(30, url, callback);
    }

    getTicket(id: Number, callback: any) {
        return this.http.get(30, this.servers.serverName + '/tickets/' + id, callback);
    }

    getTicketBySerial(serial: String, callback: any) {
        return this.http.get(30, this.servers.serverName + '/tickets/pay/' + serial, callback);
    }
    pagarTicket(object:any, callback: any) {
        return this.http.post(30, this.servers.serverName + '/tickets/pay', object, callback);
    }

    eliminarTicket(object:any, callback: any){
       return this.http.post(30, this.servers.serverName + '/tickets/anular', object, callback);
    }
}
