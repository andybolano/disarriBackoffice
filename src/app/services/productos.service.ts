import { HttpCacheService } from './httpcache.service';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { ServersService } from './../services/servers.service';

@Injectable()
export class ProductosService{

 constructor(private http: HttpCacheService, private servers: ServersService) { }

   getAll(callback: any) {
      return this.http.get(0, this.servers.serverName + '/productos',callback);
   }

   save(object:any,callback:any){
     return this.http.post(0, this.servers.serverName + '/productos',object,callback);
   }

  update(object:any,callback:any){
     return this.http.post(0, this.servers.serverName + '/productos/update/state',object,callback);
   }

    updateDisponible(object:any,callback:any){
     return this.http.post(0, this.servers.serverName + '/productos/update/disponible',object,callback);
   }

   updateProducto(object:any,callback:any){
     return this.http.post(0, this.servers.serverName + '/producto/update',object,callback);
   }

   eliminarProducto(id:Number, callback:any){
      return this.http.get(0, this.servers.serverName + '/producto/delete/'+id,callback);
   }

   getImages(id:Number, callback:any){
     return this.http.get(0, this.servers.serverName + '/producto/images/'+id,callback);
   }

    saveImage(object, callback:any){
     return this.http.post(0, this.servers.serverName + '/producto/images',object,callback);
   }

   deleteImage(object, callback:any){
     return this.http.post(0, this.servers.serverName + '/producto/images/delete',object,callback);
   }

  


    
   
}
   
