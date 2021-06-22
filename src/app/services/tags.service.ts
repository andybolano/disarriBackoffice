import { HttpCacheService } from './httpcache.service';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { ServersService } from './servers.service';

@Injectable()
export class TagsService {
    constructor(private http: HttpCacheService, private servers: ServersService) { }

    get(callback: any) {
        return this.http.get(0, this.servers.serverName + '/tag', callback);
    }

    post(tag: any, callback: any) {
        return this.http.post(0, this.servers.serverName + '/tag', tag, callback);
    }

    put(tagId: number,tag: any, callback: any) {
        return this.http.put(0, this.servers.serverName + '/tag/' + tagId, tag, callback);
    }

    delete(tagId: number, callback: any) {
        let request = {
            tag_id: tagId
        }
        return this.http.post(0, this.servers.serverName + '/tag/delete', request, callback);
    }
}