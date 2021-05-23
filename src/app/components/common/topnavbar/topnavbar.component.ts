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
        this.router.events.subscribe((path) => {
            
            if ('/mainView' == window.location.pathname) {
                this.title = 'Inicio';
            }

            if ('/productos' == window.location.pathname) {
                this.title = 'Gestión de productos';
            }
            if ('/blog' == window.location.pathname) {
                this.title = 'Gestión de blog';
            }
            if ('/coleccion' == window.location.pathname) {
                this.title = 'Gestión de colecciones';
            }
            if ('/configuracion' == window.location.pathname) {
                this.title = 'Configuración de usuario';
            }
            if ('/ventas' == window.location.pathname) {
                this.title = 'Gestión de ventas';
            }
            if ('/clientes' == window.location.pathname) {
                this.title = 'Consultar de clientes';
            }
            if ('/banner' == window.location.pathname) {
                this.title = 'Gestión de banner';
            }
        });
    }
    toggleNavigation(): void {
        jQuery("body").toggleClass("mini-navbar");
        smoothlyMenu();
    }








}
