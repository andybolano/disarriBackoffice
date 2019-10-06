import { element } from 'protractor';
import { Subject } from 'rxjs/Subject';
import { Router, NavigationStart } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ServersService, Result } from './servers.service';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';
import 'rxjs/add/operator/map'

let options;

export class UserLog {
    Menus: any[];
    grupos: any[];
    codigo: number;
    nombreCompleto: string;
    role: number;
    username: string;
}

@Injectable()
export class AuthenticationService {

    myUser: UserLog;

    constructor(private http: Http, private servers: ServersService) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        options = new RequestOptions({ headers: headers });
    }

    getLocale(): UserLog {
        return JSON.parse(localStorage.getItem('auth_item'));
    }

    login(username: string, password: string) {
        var dataloggin: any = {
            username: username,
            password: password
        };

        return this.http.post(this.servers.serverName + '/authenticate', dataloggin, options)
            .map((response: Response) => {
                let res: Result = response.json();
                if (res && res.isOk) {
                    localStorage.setItem('auth_item', JSON.stringify(res.Content));
                }

                return res;
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('auth_item');
    }
}

@Injectable()
export class AlertService {
    private subject = new Subject<any>();
    private keepAfterNavigationChange = false;
    constructor(private router: Router, private toastyService: ToastyService, private toastyConfig: ToastyConfig) {
        // configuracion del toaster
        this.toastyConfig.theme = 'bootstrap';

        // clear alert message on route change
        router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                if (this.keepAfterNavigationChange) {
                    // only keep for a single location change
                    this.keepAfterNavigationChange = false;
                } else {
                    // clear alert
                    this.subject.next();
                }
            }
        });
    }

    success(message: string, keepAfterNavigationChange = false) {
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        this.subject.next({ type: 'success', text: message });

        this.toastyService.success(message);
    }

    warning(message: string, keepAfterNavigationChange = false) {
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        this.subject.next({ type: 'success', text: message });

        this.toastyService.warning(message);
    }

    error(message: string, keepAfterNavigationChange = false) {
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        this.subject.next({ type: 'error', text: message });

        this.toastyService.warning({ title: "Advertencia", msg: message, showClose: false });
    }

    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
}