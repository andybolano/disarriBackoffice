import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { Result } from './../../../services/servers.service';
import { AlertService, VentasService } from "../../../services/base.import";
import { loading_show, loading_hide } from '../../../app.helpers';
declare var jQuery: any;

@Component({
    selector: 'tickets',
    templateUrl: 'tickets.template.html'
})
export class tickets_component implements OnInit {
    constructor(private ventasService: VentasService, private router: Router) { }
    public filter = "";
    public dataReportTickets = {
        tipo : "",
        nombre:"",
        categoria: ""
    };
    public dataReport = {
        nombre:""
    };
    public fechaDesde: String;
    public fechaHasta: String;
    public data = [];
    public ticket = {
        tipo:"",
        estado :0,
        categoria:"",
        codigo:0,
        fecha:"",
        inversion:0,
        regalia:0,
        ganancia:0,
        Detalles:[],
    };

    public sumas = {};

    ngOnInit() {
        if (sessionStorage.getItem('dataReportTickets')) {
            this.dataReport = JSON.parse(sessionStorage.getItem('dataReport'));
            this.dataReportTickets = JSON.parse(sessionStorage.getItem('dataReportTickets'));
            this.fechaDesde = this.dataReportTickets['fechaDesde'];
            this.fechaHasta = this.dataReportTickets['fechaHasta'];
            this.getTickets();
        } else {
            this.router.navigate(['reportes/ventas']);
        }
    }

    onChangeFechaDesde(value) {
        this.fechaDesde = value;
        this.getTickets();
    }

    onChangeFechaHasta(value) {
        this.fechaHasta = value;
        this.getTickets();
    }

    getTickets() {
        loading_show();
        this.getState(this.dataReportTickets['categoria'], (estado) => {
            if (this.dataReportTickets['tipo'] == 'grupo') {
                this.ventasService.getTicketsByGrupo(this.dataReportTickets['id'], estado, this.fechaDesde, this.fechaHasta, (data: Result) => {
                    loading_hide();
                    if (data.isOk) {
                        this.data = data.Content;
                    }
                });
            } else {
                this.ventasService.getTicketsByTaquilla(this.dataReportTickets['id'], estado, this.fechaDesde, this.fechaHasta, (data: Result) => {
                    loading_hide();
                    console.log(data.Content)
                    if (data.isOk) {
                        this.data = data.Content;
                    }
                });
            }
        });

    }

    getTicket(id: number) {
        loading_show();
        this.ventasService.getTicket(id, (data: Result) => {
            loading_hide();
            console.log(data.Content)
            if (data.isOk) {
                let items = data.Content;
                let valor = 0;
                let i = 0;
                for (i = 0; i < items.Detalles.length; i++) {
                    let value = items.Detalles[i].value;

                    if (i == 0) {
                        if (items.Detalles[i].estado == 3) {
                            value = 1;
                        }
                        valor = value * (items['inversion'] + items['regalia']);
                        items.Detalles[i].valor = valor;
                        continue;
                    }

                    if (items.Detalles[i].estado == 3) {
                        value = 1;
                    }
                    valor = value * items.Detalles[i - 1].valor;
                    items.Detalles[i].valor = valor;

                }
                this.ticket = items;
            }
        });
    }

    getState(state: String, callback: (s) => void) {
        let s: number;
        if (state == 'Vendidos') {
            s = -1;
        }
        if (state == 'En Juego') {
            s = 0;
        }
        if (state == 'Por Pagar') {
            s = 1;
        }
        if (state == 'Perdidos') {
            s = 2;
        }
        if (state == 'Pagados') {
            s = 3;
        }
        if (state == 'Eliminados') {
            s = 4;
        }
        if (state == 'Caducados') {
            s = 5;
        }
        if (state == 'Checking') {
            s = 6;
        }
        if (state == 'Ganadores') {
            s = 7;
        }
        return callback(s);
    }

    sum() {
        let totalventas = 0;
        let totalganadores = 0;
        let totalenjuego = 0;
        let totalporpagar = 0;
        let totalpagados = 0;
        let totalutilidad = 0;
        let datos = this.data;
        for (let i = 0; i < datos.length; i++) {
            totalventas += parseInt(datos[i].Venta);
            totalganadores += parseInt(datos[i].Ganadores);
            totalenjuego += parseInt(datos[i].EnJuego);
            totalporpagar += parseInt(datos[i].PorPagar);
            totalpagados += parseInt(datos[i].Pagados);
            totalutilidad += parseInt(datos[i].Utilidad);
        }

        this.sumas['ventas'] = totalventas;
        this.sumas['ganadores'] = totalganadores;
        this.sumas['enjuego'] = totalenjuego;
        this.sumas['porpagar'] = totalporpagar;
        this.sumas['pagados'] = totalpagados;
        this.sumas['utilidad'] = totalutilidad;
        setTimeout(() => {
            this.count();
        }, 500);

    }

    count() {
        jQuery('.counter').each(function () {
            var $this = jQuery(this),
                countTo = $this.attr('id');
            jQuery({ countNum: $this.text() }).animate({
                countNum: countTo
            },

                {

                    duration: 1000,
                    easing: 'linear',
                    step: function () {
                        $this.text(Math.floor(this.countNum));
                    },
                    complete: function () {
                        $this.text(new Intl.NumberFormat("CO").format(this.countNum));
                    }

                });
        });

    }

    backVentas() {
        this.router.navigate(['reportes/ventas']);
    }

    backTaquillas() {
        this.router.navigate(['reportes/ventas/byGrupo']);
    }

}