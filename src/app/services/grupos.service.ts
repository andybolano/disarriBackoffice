import { HttpCacheService } from './httpcache.service';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { ServersService } from './../services/servers.service';

@Injectable()
export class GruposService{

 constructor(private http: HttpCacheService, private servers: ServersService) { }

   getAll(callback: any) {
      return this.http.get(0, this.servers.serverName + '/grupos',callback);
   }

   save(object:any,callback:any){
     return this.http.post(30, this.servers.serverName + '/grupos',object,callback);
   }
  update(object:any,callback:any){
     return this.http.post(0, this.servers.serverName + '/grupos/update',object,callback);
   }

    updateState(codigo:number,estado:number, callback:any){
       var url =  this.servers.serverName + '/grupos/update/state/'+codigo+'/'+ estado;
        return this.http.get(0,url,callback);
   }
   
}
   
