import { HttpCacheService } from './httpcache.service';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { ServersService } from './servers.service';

@Injectable()
export class AboutService {
    constructor(private http: HttpCacheService, private servers: ServersService) { }

    get(callback: any) {

        return this.http.get(0, this.servers.serverName + '/data-shared/about', callback);
    }

    update(about: string,callback: any) {
        let request = {
            about: about
        };
        return this.http.post(0, this.servers.serverName + '/data-shared/about', request, callback);
    }

}