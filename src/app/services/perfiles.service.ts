import { HttpCacheService } from './httpcache.service';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { ServersService } from './../services/servers.service';

@Injectable()
export class PerfilesService {

  constructor(private http: HttpCacheService, private servers: ServersService) { }

  getPermisos(callback: any) {
    return this.http.get(30, this.servers.serverName + '/permisos', callback);
  }

  getPerfiles(callback: any) {
    return this.http.get(30, this.servers.serverName + '/permisos/perfiles', callback);
  }
  savePerfil(object: any, callback: any) {
    return this.http.post(30, this.servers.serverName + '/permisos/perfil', object, callback);
  }

  getPermisosByperfil(perfil_codigo: number, callback: any) {
    return this.http.get(0, this.servers.serverName + '/permisos/perfil/' + perfil_codigo, callback);
  }
  
  getPermisosByperfilCache(perfil_codigo: number, callback: any) {
    return this.http.get(30, this.servers.serverName + '/permisos/perfil/' + perfil_codigo, callback);
  }

  updatePerfil(object: any, callback: any) {
    return this.http.post(30, this.servers.serverName + '/permisos/perfil/update', object, callback);
  }




}