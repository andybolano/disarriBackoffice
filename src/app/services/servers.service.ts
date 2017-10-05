import { Injectable } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';

@Injectable()
export class ServersService {
    constructor() { }
    serverName: string = "http://backoffice.luxorcolombia.com/api"

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