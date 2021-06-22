import { HttpCacheService } from './httpcache.service';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { ServersService } from './servers.service';

@Injectable()
export class CategoriasService {
    constructor(private http: HttpCacheService, private servers: ServersService) { }

    get(callback: any) {
        return this.http.get(0, this.servers.serverName + '/categoria', callback);
    }

    post(categoria: any, callback: any) {
        return this.http.post(0, this.servers.serverName + '/categoria', categoria, callback);
    }

    put(categoriaId: number,categoria: any, callback: any) {
        return this.http.put(0, this.servers.serverName + '/categoria/' + categoriaId, categoria, callback);
    }

    delete(categoriaId: number, callback: any) {
        let request = {
            categoria_id: categoriaId
        }
        return this.http.delete(0, this.servers.serverName + '/categoria/', request, callback);
    }
}