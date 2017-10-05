import { HotkeysService, Hotkey } from 'angular2-hotkeys';
import { Component, OnDestroy } from '@angular/core';
import { smoothlyMenu } from '../../../app.helpers';
import { Router } from '@angular/router';
declare var jQuery: any;

@Component({
    selector: 'topnavbar',
    templateUrl: 'topnavbar.template.html'
})
export class TopnavbarComponent implements OnDestroy {
    title = "";

    i: Hotkey | Hotkey[];
    r: Hotkey | Hotkey[];
    s: Hotkey | Hotkey[];
    g: Hotkey | Hotkey[];
    u: Hotkey | Hotkey[];
    uc: Hotkey | Hotkey[];
    ut: Hotkey | Hotkey[];
    o: Hotkey | Hotkey[];
    constructor(private router: Router, private hotkeysService: HotkeysService) {
        this.router.events.subscribe((path) => {
            if ('/retiros/solicitudes' == window.location.pathname) {
                this.title = "Solicitudes de retiros";
            }
            if ('/retiros/historial' == window.location.pathname) {
                this.title = "Historial de retiros";
            }
            if ('/recargas/solicitudes' == window.location.pathname) {
                this.title = "Solicitudes de recargas";
            }
            if ('/recargas/historial' == window.location.pathname) {
                this.title = "Historial de recargas";
            }
            if ('/mainView' == window.location.pathname) {
                this.title = 'Inicio';
            }

            if ('/perfiles' == window.location.pathname) {
                this.title = 'Gestión de perfiles';
            }
            if ('/perfil/crear' == window.location.pathname) {
                this.title = 'Crear Perfil';
            }
            if ('/perfil/consultar' == window.location.pathname) {
                this.title = 'Consultar Perfiles';
            }
            if ('/reportes/ventas' == window.location.pathname) {
                this.title = 'Reporte de ventas';
            }
            if ('/reportes/ventas/byGrupo' == window.location.pathname) {
                this.title = 'Reporte de ventas por usuarios';
            }
            if ('/reportes/ventas/tickets' == window.location.pathname) {
                this.title = 'Consulta de Tickets';
            }

            if ('/configuracion/oddtypes' == window.location.pathname) {
                this.title = 'Configuración de mercados';
            }
            if ('/configuracion/encuentros' == window.location.pathname) {
                this.title = 'Encuentros';
            }

            if ('/procesos/pago' == window.location.pathname) {
                this.title = 'Pago de ticket';
            }
             if ('/procesos/eliminar' == window.location.pathname) {
                this.title = 'Eliminación de ticket';
            }
            if ('/usuarios/crear' == window.location.pathname) {
                this.title = 'Crear usuarios';
            }
            if ('/usuarios/crear/taquilleros' == window.location.pathname) {
                this.title = 'Gestión de usuarios taquilleros';
            }
            if ('/usuarios/consultar' == window.location.pathname) {
                this.title = 'Consultar Usuarios';
            }
            if ('/usuarios/actualizar' == window.location.pathname) {
                this.title = 'Actualizar Usuario';
            }
            if ('/franquicias' == window.location.pathname) {
                this.title = 'Gestión de franquicias';
            }
            if ('/grupos' == window.location.pathname) {
                this.title = 'Gestión de grupos';
            }
            if ('/geotaquillas' == window.location.pathname) {
                this.title = 'Geotaquillas';
            }
            if ('/clientes' == window.location.pathname) {
                this.title = 'Gestión de clientes';
            }
        });
        this.o = hotkeysService.add(new Hotkey('alt+o', this.opress));
        this.i = hotkeysService.add(new Hotkey('alt+i', this.ipress));
        this.r = hotkeysService.add(new Hotkey('alt+r', this.rpress));
        this.g = hotkeysService.add(new Hotkey('alt+g', this.gpress));
        this.u = hotkeysService.add(new Hotkey('alt+u', this.upress));
        this.s = hotkeysService.add(new Hotkey('alt+s', this.spress));
        this.uc = hotkeysService.add(new Hotkey('alt+u+c', this.ucpress));
        this.ut = hotkeysService.add(new Hotkey('alt+u+t', this.utpress));
    }

    opress = (event: KeyboardEvent, combo: string): boolean => {
        this.router.navigate(['retiros/solicitudes']);
        return true;
    }

    ipress = (event: KeyboardEvent, combo: string): boolean => {
        this.router.navigate(['mainView']);
        return true;
    }

    spress = (event: KeyboardEvent, combo: string): boolean => {
        this.router.navigate(['franquicias']);
        return true;
    }

    rpress = (event: KeyboardEvent, combo: string): boolean => {
        this.router.navigate(['recargas/solicitudes']);
        return true;
    }

    gpress = (event: KeyboardEvent, combo: string): boolean => {
        this.router.navigate(['grupos']);
        return true;
    }
    upress = (event: KeyboardEvent, combo: string): boolean => {
        this.router.navigate(['usuarios/consultar']);
        return true;
    }
    ucpress = (event: KeyboardEvent, combo: string): boolean => {
        this.router.navigate(['usuarios/crear']);
        return true;
    }
    utpress = (event: KeyboardEvent, combo: string): boolean => {
        this.router.navigate(['usuarios/crear/taquilleros']);
        return true;
    }

    ngOnDestroy() {

        this.hotkeysService.remove(this.i);
        this.hotkeysService.remove(this.r);
        this.hotkeysService.remove(this.g);
        this.hotkeysService.remove(this.u);
        this.hotkeysService.remove(this.uc);
        this.hotkeysService.remove(this.ut);
        this.hotkeysService.remove(this.s);
        this.hotkeysService.remove(this.o);
    }

    toggleNavigation(): void {
        jQuery("body").toggleClass("mini-navbar");
        smoothlyMenu();
    }








}
