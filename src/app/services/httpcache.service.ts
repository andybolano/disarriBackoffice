import { Subject } from 'rxjs/Subject';
import { HttpService } from './../config/http.service';
import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Response } from '@angular/http';


@Injectable()
export class HttpCacheService {
    private cache: {};

    constructor(private http: HttpService) {
        this.cache = {};
    }

    post(timeout: number, url: string, data: any = null, callback: any) {
        timeout *= 1000;
        let sign = "post" + url + JSON.stringify(data);
        console.log(this.cache[sign])
        if (this.cache[sign]) {            
            if (this.cache[sign].isValid()) {
                callback(this.cache[sign].getData());
            }
            else {
                console.log("cache timeout");
                this.http.post(url, data).map((response: Response) => {
                    let data = response.json();
                    return data;
                }).subscribe((data) => {
                    this.cache[sign] = new CacheUnit(timeout, data);
                    callback(data);
                });
            }
        } else {
            console.log("cache create");
            this.http.post(url, data).map((response: Response) => {
                let data = response.json();
                return data;
            }).subscribe((data) => {
                this.cache[sign] = new CacheUnit(timeout, data);
                callback(data);
            });
        }
    }

    put(timeout: number, url: string, data: any = null, callback: any) { console.log(url)
        timeout *= 1000;
        let sign = "put" + url + JSON.stringify(data);
        console.log(this.cache[sign])
        if (this.cache[sign]) {            
            if (this.cache[sign].isValid()) {
                callback(this.cache[sign].getData());
            }
            else {
                console.log("cache timeout");
                this.http.put(url, data).map((response: Response) => {
                    let data = response.json();
                    return data;
                }).subscribe((data) => {
                    this.cache[sign] = new CacheUnit(timeout, data);
                    callback(data);
                });
            }
        } else {
            console.log("cache create");
            this.http.put(url, data).map((response: Response) => {
                let data = response.json();
                return data;
            }).subscribe((data) => {
                this.cache[sign] = new CacheUnit(timeout, data);
                callback(data);
            });
        }
    }

    delete(timeout: number, url: string, data: any = null, callback: any) {
        timeout *= 1000;
        let sign = "delete" + url + JSON.stringify(data);
        console.log(this.cache[sign])
        if (this.cache[sign]) {            
            if (this.cache[sign].isValid()) {
                callback(this.cache[sign].getData());
            }
            else {
                console.log("cache timeout");
                this.http.delete(url, data).map((response: Response) => {
                    let data = response.json();
                    return data;
                }).subscribe((data) => {
                    this.cache[sign] = new CacheUnit(timeout, data);
                    callback(data);
                });
            }
        } else {
            console.log("cache create");
            this.http.delete(url, data).map((response: Response) => {
                let data = response.json();
                return data;
            }).subscribe((data) => {
                this.cache[sign] = new CacheUnit(timeout, data);
                callback(data);
            });
        }
    }

    get(timeout: number, url: string, callback: any) {
        timeout *= 1000;
        let sign = "get" + url;
        console.log(this.cache[sign])
        if (this.cache[sign]) {            
            if (this.cache[sign].isValid()) {
                callback(this.cache[sign].getData());
            }
            else {
                console.log("cache timeout");
                this.http.get(url).map((response: Response) => {
                    let data = response.json();
                    return data;
                }).subscribe((data) => {
                    this.cache[sign] = new CacheUnit(timeout, data);
                    callback(data);
                });
            }
        } else {
            console.log("cache create");
            this.http.get(url).map((response: Response) => {
                let data = response.json();
                return data;
            }).subscribe((data) => {
                this.cache[sign] = new CacheUnit(timeout, data);
                callback(data);
            });
        }
    }  
    
    clear(url: string){
        let sign = "get" + url;
        this.cache[sign].timeout = 0;
    }
}

class CacheUnit {
    born: Date
    timeout: number
    data: any

    constructor(timeout: number, data: any) {
        this.born = new Date();
        this.timeout = timeout;
        this.data = data;
    }

    isValid() {        
        return (new Date().getTime() - this.born.getTime()) < this.timeout;
    }

    getData() {
        return this.data;
    }
}