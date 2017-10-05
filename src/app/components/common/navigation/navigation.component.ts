import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
declare var jQuery:any;

@Component({
    selector: 'navigation',
    templateUrl: 'navigation.template.html'
})

export class NavigationComponent {


 ngOnInit(){
      this.getUser();
  }
  
public user = {
    username:"",
    rol:""
}; 

    constructor(private router: Router) {
    }

    getUser(){
        this.user = JSON.parse(localStorage.getItem('auth_item'));
    }

    ngAfterViewInit() {
        jQuery('#side-menu').metisMenu();
    }

    activeRoute(routename: string): boolean{
        return this.router.url.indexOf(routename) > -1;
    }


}