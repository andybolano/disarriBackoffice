import { Component , OnInit } from '@angular/core';
import { AlertService,VentasService } from "../../services/base.import";
import { Result } from './../../services/servers.service';
import { loading_show, loading_hide } from '../../app.helpers';
import swal from 'sweetalert2';
declare var jQuery: any;
@Component({
    selector: 'mianView',
    templateUrl: 'main-view.template.html'
})
export class mainViewComponent { 


    constructor(
        private alertService: AlertService,
         private ventasService: VentasService
    ) {

    }
   
    public filter = "";
    public pedidos = [];
    Pedido : any = {};

    public envio_ = "";
    public productos = [];

    
    ngOnInit() {
       this.getPendientes();
    }



    getPendientes(){
        loading_show();
        this.ventasService.getPendientes((data: Result) => {
            loading_hide();
            if (data.isOk) {
                this.pedidos = data.Content;
<<<<<<< HEAD
             
=======
>>>>>>> d0cc4a29bccc6ce7e8791a92a111c7ecdd3d657e
            }

        });
    }

    viewPedido(item){
<<<<<<< HEAD
        console.log(item)
     this.Pedido = item;
     this.envio_ = item.envio;
=======
     this.Pedido = item;
>>>>>>> d0cc4a29bccc6ce7e8791a92a111c7ecdd3d657e
        loading_show();
        this.ventasService.getProductosVenta(item.id,(data: Result) => {
            loading_hide();
            if (data.isOk) {
<<<<<<< HEAD

=======
                console.log(data)
>>>>>>> d0cc4a29bccc6ce7e8791a92a111c7ecdd3d657e
                this.productos = data.Content;
            }

        });
    }

<<<<<<< HEAD
     getSubTotal() {
                var total = 0;
                for (var i = 0; i < this.productos.length; i++) {
                    total += parseInt(this.productos[i].valor_total);
                }
                return total;
            }

            getTotal() {
                var total = 0;
                for (var i = 0; i < this.productos.length; i++) {
                    total += parseInt(this.productos[i].valor_total);
                }
            total += parseInt(this.envio_);
=======
     getTotal() {
                var total = 0;
                for (var i = 0; i < this.productos.length; i++) {
                    total += this.productos[i].valor_total;
                }
>>>>>>> d0cc4a29bccc6ce7e8791a92a111c7ecdd3d657e
                return total;
            }



<<<<<<< HEAD


=======
>>>>>>> d0cc4a29bccc6ce7e8791a92a111c7ecdd3d657e
    despachar(state: String, item: any){
        var element = document.getElementById("wrapper");
        element.classList.add("blur");

        let info = "";
        if(state == 'DESPACHADO'){
            info = 'despachar';
        }
        if(state == 'ELIMINADO'){
            info = "eliminar";
        }



        swal({
            title: 'Esta seguro?',
            text: "Realmente va a "+info+" este pedidido? ",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, '+info+' !',
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
               this.getPendientes();
            }
         });
         }).catch(swal.noop)

    }

}


