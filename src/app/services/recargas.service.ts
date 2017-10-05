
import { HttpCacheService } from './httpcache.service';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { ServersService } from './../services/servers.service';

@Injectable()
export class RecargasService {

 constructor(private http: HttpCacheService, private servers: ServersService) { }
 
    getSolititudes(callback: any) {
        return this.http.get(0, this.servers.serverName + '/recargas/pending', callback);
   }

   changeState(object:any,callback: any){
       return this.http.post(0, this.servers.serverName + '/recargas/update/state',object,callback);
   }

   getHistorial(fecha_inicial:string, fecha_final:string, callback:any){
       return this.http.get(0, this.servers.serverName + '/recargas/'+fecha_inicial+'/'+fecha_final, callback);
   }

   

}