import { HotkeysService, Hotkey } from 'angular2-hotkeys';
import { Component, OnDestroy } from '@angular/core';
import { smoothlyMenu } from '../../../app.helpers';
import { Router } from '@angular/router';
declare var jQuery: any;

@Component({
    selector: 'topnavbar',
    templateUrl: 'topnavbar.template.html'
})
export class TopnavbarComponent  {
    title = "";
    constructor(private router: Router, private hotkeysService: HotkeysService) {
       
    }
    toggleNavigation(): void {
        jQuery("body").toggleClass("mini-navbar");
        smoothlyMenu();
    }








}
