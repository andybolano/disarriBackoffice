
import { viewsModule } from './../../modules/view.module';

import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { AlertService , VentasService} from "../../services/base.import";
import { Result } from './../../services/servers.service';
import { loading_show, loading_hide } from '../../app.helpers';
import swal from 'sweetalert2';
declare var jQuery: any;
@Component({
    selector: 'ventasComponent',
    templateUrl: 'ventas.template.html'
})
export class ventasComponent {

    constructor(
        private alertService: AlertService,
        private ventasService: VentasService
    ) {

    }

     public filter = "";
    public fechaDesde: String;
    public fechaHasta: String;
    public data = [];
     public Pedido = {
         email:"",
         telefono:"",
         pais:"",
         ciudad:"",
         direccion:"",
         apellidos:"",
         nombres:""
     };
    public productos = [];

    ngOnInit() {
          let fecha = new Date();
        if(!sessionStorage.getItem('ultima_fecha_ventas')){
            this.fechaDesde = fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate();
            this.fechaHasta = fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate();
            sessionStorage.setItem('ultima_fecha_ventas',JSON.stringify([this.fechaDesde,this.fechaHasta])); 
        }else{
            var res = JSON.parse(sessionStorage.getItem('ultima_fecha_ventas'));
             this.fechaDesde = res[0];
             this.fechaHasta = res[1];
        }
        this.getVentas();
    }

     onChangeFechaDesde(value) {
        if(!this.fechaHasta || this.fechaHasta == ""){
            this.alertService.success("Ingresar fecha final");
           return ;
        }
        this.fechaDesde = value;
         sessionStorage.setItem('ultima_fecha_ventas',JSON.stringify([this.fechaDesde,this.fechaHasta])); 
        this.getVentas();
    }

    onChangeFechaHasta(value) {
        if(!this.fechaDesde || this.fechaDesde == ""){
            this.alertService.warning("Ingresar fecha Inicial");
            return 
        }
        this.fechaHasta = value;
         sessionStorage.setItem('ultima_fecha_ventas',JSON.stringify([this.fechaDesde,this.fechaHasta])); 
        this.getVentas();
    }

     moveToFecha(direction) {

           var parts_1 =this.fechaHasta.split('-');
           let f1 = new Date(parseInt(parts_1[0]), parseInt(parts_1[1])-1, parseInt(parts_1[2]))
           let fecha_hasta;

           var parts_2 =this.fechaDesde.split('-');
           let f2 = new Date(parseInt(parts_2[0]), parseInt(parts_2[1])-1, parseInt(parts_2[2]))
           let fecha_desde;

            if (direction === '+') {
                fecha_hasta = new Date(f1.getTime() + 24 * 60 * 60 * 1000);
                fecha_desde = new Date(f1.getTime() + 24 * 60 * 60 * 1000);
            }
            if (direction === '-') {
                fecha_hasta = new Date(f1.getTime() - 24 * 60 * 60 * 1000);
                fecha_desde = new Date(f1.getTime() - 24 * 60 * 60 * 1000);
            }

            let fechaFormat = new Date(fecha_hasta)
            this.fechaHasta = fechaFormat.getFullYear() + "-" + (fechaFormat.getMonth() + 1) + "-" + fechaFormat.getDate();

            let fechaFormat2 = new Date(fecha_desde)
            this.fechaDesde = fechaFormat2.getFullYear() + "-" + (fechaFormat2.getMonth() + 1) + "-" + fechaFormat2.getDate();
            sessionStorage.setItem('ultima_fecha_ventas',JSON.stringify([this.fechaDesde,this.fechaHasta])); 
            this.getVentas();
    }

     getVentas(){
        if(this.fechaDesde == "" || this.fechaDesde == undefined){
            this.alertService.warning("Selecciona fecha inicial");
            return;
        }
        if(this.fechaHasta == "" || this.fechaHasta == undefined){
            this.alertService.warning("Seleccionar fecha final");
            return;
        }
        this.data = [];
        loading_show();
        this.ventasService.getByFechas(this.fechaDesde, this.fechaHasta, (data: Result) => {
            loading_hide();
            if (data.isOk) {
                this.data = data.Content;
            }
        });
    }

    entregado(state: String, item: any){
        var element = document.getElementById("wrapper");
        element.classList.add("blur");
        swal({
            title: 'Esta seguro?',
            text: "Realmente este pedidido ha sido entregado? ",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, ha sido entregado !',
            cancelButtonText: 'Cancelar',
            allowOutsideClick: false
        }).then(() => {
        loading_show();
        item.estado = state;
        this.ventasService.updateState(item,(data: Result) => {
            loading_hide();
            if (data.isOk) {
                 swal(
                        'Realizado!',
                        data.Mensaje,
                        'success'
                    )
              
            }
         });
         }).catch(swal.noop)

    }


   viewPedido(item){
     this.Pedido = item;
        loading_show();
        this.ventasService.getProductosVenta(item.id,(data: Result) => {
            loading_hide();
            if (data.isOk) {
                this.productos = data.Content;
            }

        });
    }

     getTotal() {
                var total = 0;
                for (var i = 0; i < this.productos.length; i++) {
                    total += this.productos[i].valor_total;
                }
                return total;
            }


}