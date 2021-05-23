import { Injectable } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';

@Injectable()
export class ServersService {
    constructor() { }
<<<<<<< HEAD
    //serverName: string = "http://localhost/deirisarri/api/public/index.php/api"
    serverName: string = "https://deirisarri.co/api/public/api"
=======
serverName: string = "http://localhost/disarri/api/public/api"
//serverName: string = "https://birriassoccer.com/deirisarri/api/public/api"
>>>>>>> d0cc4a29bccc6ce7e8791a92a111c7ecdd3d657e
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