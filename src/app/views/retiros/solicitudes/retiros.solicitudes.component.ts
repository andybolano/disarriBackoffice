import { Component } from '@angular/core';
import swal from 'sweetalert2';


@Component({
    selector: 'retiros_solicitudes',
    templateUrl: 'retiros.solicitudes.template.html'
})
export class retiros_solicitudes_component { 
   

    public updateState = (state) => {
         var element = document.getElementById("wrapper");
        element.classList.add("blur");

          swal({
            title: 'Esta seguro?',
            text: "Desea realmente cambiar esta recarga a: "+state,
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Cambiar!',
            cancelButtonText: 'Cancelar',
            allowOutsideClick: false
            }).then(function () {
                swal(
                     state,
                    'La recarga ha sido cambiada actualizada.',
                    'success'
                )
            }).catch(swal.noop)
    }
}