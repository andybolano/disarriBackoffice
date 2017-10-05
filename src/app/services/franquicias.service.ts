import { HttpCacheService } from './httpcache.service';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { ServersService } from './../services/servers.service';

@Injectable()
export class FranquiciasService {

  constructor(private http: HttpCacheService, private servers: ServersService) { }

  getAll(callback: any) {
    return this.http.get(0, this.servers.serverName + '/franquicias', callback);
  }
  getGruposByFranquicia(id: number, callback: any) {
    return this.http.get(30, this.servers.serverName + '/franquicias/' + id + '/grupos', callback);
  }

  save(object: any, callback: any) {
    return this.http.post(30, this.servers.serverName + '/franquicias', object, callback);
  }
  update(object: any, callback: any) {
    return this.http.post(30, this.servers.serverName + '/franquicias/update', object, callback);
  }
  updateFraquicia(object: any, callback: any) {
    return this.http.post(30, this.servers.serverName + '/permisos/perfil/update', object, callback);
  }

  updateState(codigo: number, estado: number, callback: any) {
    var url = this.servers.serverName + '/franquicias/update/state/' + codigo + '/' + estado;
    return this.http.get(0, url, callback);
  }




}