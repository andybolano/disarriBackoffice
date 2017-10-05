import { HttpCacheService } from './httpcache.service';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { ServersService } from './../services/servers.service';

@Injectable()
export class EncuentrosService {
 constructor(private http: HttpCacheService, private servers: ServersService) { }
 
    getAll(fecha_inicial:String, fecha_final:String, callback: any) {
        return this.http.get(30, this.servers.serverName + '/match/'+fecha_final+'/'+fecha_final ,callback);
   }


}
