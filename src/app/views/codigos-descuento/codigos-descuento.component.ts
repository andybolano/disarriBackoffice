import { viewsModule } from '../../modules/view.module';
import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { TagsService, AlertService, BlogService, CodigosDescuentosService } from "../../services/base.import";
import { Result } from '../../services/servers.service';
import { loading_show, loading_hide } from '../../app.helpers';
import swal from 'sweetalert2';
declare var jQuery: any;

@Component({
  selector: 'app-codigos-descuento',
  templateUrl: './codigos-descuento.component.html',
  styleUrls: ['./codigos-descuento.component.css']
})
export class CodigosDescuentosComponent implements OnInit {

  public codigosDescuentos: Array<any> = [];
  public update: boolean = false;
  public codigoDescuento: any = {};

  constructor(
    private codigosDescuentosService: CodigosDescuentosService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.getCodigosDescuentos();
  }

  getCodigosDescuentos() {
    loading_show();
    this.codigosDescuentosService.get((response) => {
      loading_hide();
      if (response.isOk) {
        this.codigosDescuentos = response.Content;
      } else {
        this.alertService.error(response.Mensaje);
      }
    });
  }

  nuevo() {
    this.update = false;
    this.codigoDescuento = {
      id: 0,
      code: "",
      description: "",
      initial_date: "",
      end_date: "",
      percentage: 0
    };
  }

  save() {

    if (!this.codigoDescuento.description || this.codigoDescuento.description == "") {
      this.alertService.warning("Ingresar descripción!");
      return;
    }


    if (!this.codigoDescuento.initial_date || this.codigoDescuento.initial_date == "") {
      this.alertService.warning("Ingresar fecha Inicial!");
      return;
    }

    if (!this.codigoDescuento.end_date || this.codigoDescuento.end_date == "") {
      this.alertService.warning("Ingresar fecha Final!");
      return;
    }

    loading_show();
    this.codigosDescuentosService.post(this.codigoDescuento, (data: Result) => {
      loading_hide();
      if (data.isOk) {
        this.nuevo();
        this.alertService.success(data.Mensaje);
        jQuery('#modalCodigoDescuento').modal('hide');
        this.getCodigosDescuentos();
      } else {
        this.alertService.error(data.Mensaje);
      }
    });
  }

  delete(id: number) {

    var element = document.getElementById("wrapper");
    element.classList.add("blur");

    swal({
      title: 'Esta seguro?',
      text: "Desea realmente eliminar este código de descuento? ",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!',
      cancelButtonText: 'Cancelar',
      allowOutsideClick: false
    }).then(() => {

      loading_show();
      this.codigosDescuentosService.delete(id, (data: Result) => {
        loading_hide();
        if (data.isOk) {
          swal(
            'Realizado!',
            data.Mensaje,
            'success'
          )
          this.getCodigosDescuentos();
        }

      });
    }).catch(swal.noop)

  }

  editShow(item) {
    this.update = true;
    this.codigoDescuento = item;

  }

  updateCodigoDescuento() {


    if (!this.codigoDescuento.code || this.codigoDescuento.code == "") {
      this.alertService.warning("Ingresar Código!");
      return;
    }

    if (!this.codigoDescuento.description || this.codigoDescuento.description == "") {
      this.alertService.warning("Ingresar descripción!");
      return;
    }


    if (!this.codigoDescuento.initial_date || this.codigoDescuento.initial_date == "") {
      this.alertService.warning("Ingresar fecha Inicial!");
      return;
    }

    if (!this.codigoDescuento.end_date || this.codigoDescuento.end_date == "") {
      this.alertService.warning("Ingresar fecha Final!");
      return;
    }

    loading_show();
    this.codigosDescuentosService.put(this.codigoDescuento.id, this.codigoDescuento, (data: Result) => {
      loading_hide();
      if (data.isOk) {
        this.nuevo();
        this.alertService.success(data.Mensaje);
        jQuery('#modalCodigoDescuento').modal('hide');
        this.getCodigosDescuentos();
      } else {
        this.alertService.error(data.Mensaje);
      }
    });
  }

}
