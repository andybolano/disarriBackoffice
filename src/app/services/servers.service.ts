import { Injectable } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';

@Injectable()
export class ServersService {
    constructor() { }
//serverName: string = "http://localhost/vistaflor/api/public/api"
serverName: string = "http://vistaflor.com/api/public/api"
    storageGrupo(codigo_grupo) {
        localStorage.setItem('session_group', codigo_grupo);
    }

    getGrupo() {
        return localStorage.getItem('session_group');
    }
}

export class Result {
    Mensaje: string;
    codigoRespuesta: number;
    isError: boolean;
    isFail: boolean;
    isOk: boolean;
    Content: any;
}