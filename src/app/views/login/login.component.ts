import { Result } from './../../services/servers.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, AuthenticationService } from "../../services/base.import";

@Component({
    selector: 'login',
    templateUrl: 'login.template.html'
})
export class loginComponent implements OnInit {

    model: any = {};
    loading = false;
    returnUrl: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService) { }

    ngOnInit() {
        this.authenticationService.logout();
    }

    login() {
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password).subscribe(
            data => {
                let res: Result = data;

                if (res.isOk) {
                    this.router.navigate(['mainView']);
                } else {
                    this.alertService.error(res.Mensaje);
                    this.loading = false;
                }
            },
            error => {
                let badresponse = error;
                if (error.status == '401') {
                    this.alertService.error(badresponse.Mensaje);
                } else {
                    this.alertService.error(error);
                }

                this.loading = false;
            });
    }
}