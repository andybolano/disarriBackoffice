import { HttpCacheService } from './httpcache.service';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { ServersService } from './servers.service';

@Injectable()
export class SubcategoriasService {
    constructor(private http: HttpCacheService, private servers: ServersService) { }

    get(categoriaId: number, callback: any) {
        return this.http.get(0, this.servers.serverName + '/sub-categoria/' + categoriaId, callback);
    }

    post(subcategoria: any, callback: any) {
        return this.http.post(0, this.servers.serverName + '/sub-categoria', subcategoria, callback);
    }

    put(subcategoriaId: number,subcategoria: any, callback: any) {
        return this.http.put(0, this.servers.serverName + '/sub-categoria/' + subcategoriaId, subcategoria, callback);
    }

    delete(subcategoriaId: number, callback: any) {
        let request = {
            subcategoria_id: subcategoriaId
        }
        return this.http.delete(0, this.servers.serverName + '/sub-categoria', request, callback);
    }
}