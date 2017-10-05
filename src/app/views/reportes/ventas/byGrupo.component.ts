import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { Result } from './../../../services/servers.service';
import { AlertService, VentasService } from "../../../services/base.import";
import { loading_show, loading_hide } from '../../../app.helpers';
declare var jQuery: any;

@Component({
    selector: 'ventasByGrupo',
    templateUrl: 'byGrupo.template.html'
})
export class ventasbyGrupo_component implements OnInit {
    constructor(private ventasService: VentasService, private router: Router) { }

   public filter = "";
    public dataReport = {
        nombre:""
    };
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
        if (sessionStorage.getItem('dataReport')) {
            this.dataReport = JSON.parse(sessionStorage.getItem('dataReport'));
            this.fechaDesde = this.dataReport['fechaDesde'];
            this.fechaHasta = this.dataReport['fechaHasta'];
            this.getReport();
        } else {
            this.router.navigate(['reportes/ventas']);
        }
    }

    onChangeFechaDesde(value) {
        this.fechaDesde = value;
        this.getReport();
    }

    onChangeFechaHasta(value) {
        this.fechaHasta = value;
        this.getReport();
    }

    getReport(){
         loading_show();
        this.ventasService.getUsuariosByGrupo(this.dataReport['idGrupo'],this.fechaDesde, this.fechaHasta, (data: Result) => {
            loading_hide();
            if (data.isOk) {
                this.data = data.Content;
                this.sum();
            }
        });
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

    back() {
        this.router.navigate(['reportes/ventas']);
    }

      getTicketsByTaquilla(idTaquilla: number, grupo: String, categoria: String) {
        var object = {
            id: idTaquilla,
            nombre: grupo,
            categoria: categoria,
            fechaDesde: this.fechaDesde,
            fechaHasta: this.fechaHasta,
            tipo:'taquilla'
        }
        sessionStorage.setItem('dataReportTickets', JSON.stringify(object));
        this.router.navigate(['reportes/ventas/tickets']);
    }




}