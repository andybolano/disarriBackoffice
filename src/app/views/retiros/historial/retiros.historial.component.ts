import { RetirosService } from './../../../services/retiros.service';
import { Component, OnInit } from '@angular/core';
import { Result } from './../../../services/servers.service';

@Component({
    selector: 'retiros_historial',
    templateUrl: 'retiros.historial.template.html'
})
export class retiros_historial_component implements OnInit { 
    constructor(private RetirosService: RetirosService){

    }
public filter = "";
    fechaDesde: String;
    fechaHasta: String;
    data = [];
    segmentDimmed: Boolean = true;

    ngOnInit(){
        let fecha = new Date();
        this.fechaDesde = fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + 1;
        this.fechaHasta = fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate();
         this.getRetiros();
    }

    onChangeFechaDesde(value){
        this.fechaDesde = value;
       this.getRetiros();
    }
    onChangeFechaHasta(value){
       this.fechaHasta = value;
       this.getRetiros();
    }

    getRetiros(){
    this.RetirosService.getHistorial(this.fechaDesde, this.fechaHasta, (data: Result) => {
        if (data.isOk) {
          this.data = data.Content;
        }

        this.segmentDimmed = false;
      });
        
    }
}