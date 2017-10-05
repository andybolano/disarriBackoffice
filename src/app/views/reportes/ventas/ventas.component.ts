import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Result } from './../../../services/servers.service';
import { AlertService, VentasService } from "../../../services/base.import";
import { loading_show, loading_hide } from '../../../app.helpers';
declare var jQuery: any;

@Component({
    selector: 'ventas',
    templateUrl: 'ventas.template.html'
})
export class ventas_component implements OnInit {
    constructor(private ventasService: VentasService, private router: Router) { }
    public filter = "";
    public fechaDesde: String;
    public fechaHasta: String;
    public data = [];
     public sumas = {
        ventas:0,
        ganadores:0,
        enjuego:0,
        porpagar:0,
        pagados:0,
        utilidad:0,
    };

    ngOnInit() {
        let fecha = new Date();
        this.fechaDesde = fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate();
        this.fechaHasta = fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate();
        this.getBalanceByGrupos();
    }

    onChangeFechaDesde(value) {
        this.fechaDesde = value;
        this.getBalanceByGrupos();
    }

    onChangeFechaHasta(value) {
        this.fechaHasta = value;
        this.getBalanceByGrupos();
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

    getBalanceByGrupos() {
        this.data = [];
        loading_show();
        this.ventasService.getReporteByGrupos(this.fechaDesde, this.fechaHasta, (data: Result) => {
            loading_hide();
            console.log(data)
            if (data.isOk) {
                this.data = data.Content;
                this.sum();
            }
        });
    }

    getUsuariosByGrupo(idGrupo: number, grupo: String) {
        var object = {
            idGrupo: idGrupo,
            nombre: grupo,
            fechaDesde: this.fechaDesde,
            fechaHasta: this.fechaHasta
        }
        sessionStorage.setItem('dataReport', JSON.stringify(object));
        this.router.navigate(['reportes/ventas/byGrupo']);
    }

    getTicketsByGrupo(idGrupo: number, grupo: String, categoria: String) {
        var object = {
            id: idGrupo,
            nombre: grupo,
            categoria: categoria,
            fechaDesde: this.fechaDesde,
            fechaHasta: this.fechaHasta,
            tipo:'grupo'
        }
        sessionStorage.setItem('dataReportTickets', JSON.stringify(object));
        this.router.navigate(['reportes/ventas/tickets']);
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


}