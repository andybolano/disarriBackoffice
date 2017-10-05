import { Component, OnInit } from '@angular/core';
import { AlertService, GruposService, UsuariosService } from "../../services/base.import";
import { Result } from './../../services/servers.service';
import { loading_show, loading_hide } from '../../app.helpers';
declare var jQuery: any;
declare var google: any;

@Component({
    selector: 'geotaquillas_component',
    templateUrl: 'geotaquillas.template.html'
})
export class geotaquillas_component {
    constructor(
        private gruposService: GruposService,
        private alertService: AlertService,
        private usuariosService: UsuariosService,
    ) {

    }

    public map = "";
    public markers = [];
    public taquilleros = [];
    public grupos = [];
    public selectedGrupo = "";

    private markes = [];
    private infoWindow = "";

    ngOnInit() {
        this.getGrupos();
        jQuery('#map').css({ 'height': jQuery(window).height() - 200 + "px" });
        this.initMap();
    }

    initMap() {
        var myLatlng = new google.maps.LatLng(10.468009070525722, -73.25122777788351);
        this.map = new google.maps.Map(document.getElementById('map'), {
            center: myLatlng,
            zoom: 8
        });
    }

    getGrupos() {
        loading_show();
        this.gruposService.getAll((data: Result) => {
            loading_hide();
            if (data.isOk) {
                this.grupos = data.Content;
                this.selectedGrupo = this.grupos[1].codigo;
                this.getTaquillas()
            }

        });
    }

    getTaquillas() {
        this.deleteMarkers();
        loading_show();
        this.usuariosService.getTaquilleros(parseInt(this.selectedGrupo), (data: Result) => {
            loading_hide();
            if (data.isOk) {
                this.taquilleros = data.Content;
                if (this.taquilleros.length == 0) {
                    this.alertService.warning('No hay taquillas para este grupo');
                    return;
                }

                for (var i = 0; i < this.taquilleros.length; i++) {
                    this.createMarker(this.taquilleros[i]);
                }
            }
        })
    }

    createMarker(taquilla: any) {
        if (taquilla.latitud && taquilla.longitud) {
            var marker = new google.maps.Marker({
                map: this.map,
                position: new google.maps.LatLng(taquilla.latitud, taquilla.longitud),
                title: taquilla.nombre
            });
            marker.content = '<div class="infoWindowContent">Ubicación de taquilla</div>';
            marker.title = taquilla.user;
            google.maps.event.addListener(marker, 'click', (function (marker) {
              return function(evt) {
                var infowindow = new google.maps.InfoWindow({
                    content:'<h5>' + marker.title + '</h5>' + marker.content
                    });
                infowindow.open(this.map,marker);
              }
            })(marker));

            this.markers.push(marker);
        }
    }

    deleteMarkers() {
        this.setMapOnAll(null);
        this.markers = [];
    }

    setMapOnAll(map) {
        for (var i = 0; i < this.markers.length; i++) {
            this.markers[i].setMap(map);
        }
    }

   

}