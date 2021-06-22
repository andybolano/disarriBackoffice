import { viewsModule } from '../../modules/view.module';
import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { SubcategoriasService, AlertService, BlogService } from "../../services/base.import";
import { Result } from '../../services/servers.service';
import { loading_show, loading_hide } from '../../app.helpers';
import swal from 'sweetalert2';
declare var jQuery: any;

@Component({
  selector: 'app-subcategorias',
  templateUrl: './subcategorias.component.html',
  styleUrls: ['./subcategorias.component.css']
})
export class SubcategoriasComponent implements OnInit {

  public subcategorias: Array<any> = [];
  public update: boolean = false;
  public categoria: any = {};
  public subcategoria: any = {};

  constructor(
    private subcategoriasService: SubcategoriasService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.buscarInformacionCategoria();
    this.getSubcategorias();
  }

  buscarInformacionCategoria(){
    let categoriaCadena = localStorage.getItem("categoria");
    if(categoriaCadena != null && categoriaCadena != ""){
      this.categoria = JSON.parse(categoriaCadena);
      return;
    }
    history.back();
  }

  getSubcategorias() {
    loading_show();
    this.subcategoriasService.get(this.categoria.id, (response) => {
      loading_hide();
      if (response.isOk) {
        this.subcategorias = response.Content;
      } else {
        this.alertService.error(response.Mensaje);
      }
    });
  }

  nuevo() {
    this.update = false;
    this.subcategoria = {
      id: 0,
      name: "",
      description: ""
    };
  }

  save() {

    if (!this.subcategoria.name || this.subcategoria.name == "") {
      this.alertService.warning("Ingresar nombre!");
      return;
    }

    if (!this.subcategoria.description || this.subcategoria.description == "") {
      this.alertService.warning("Ingresar descripción!");
      return;
    }

    loading_show();
    this.subcategoriasService.post(this.subcategoria, (data: Result) => {
      loading_hide();
      if (data.isOk) {
        this.nuevo();
        this.alertService.success(data.Mensaje);
        jQuery('#modalSubcategoria').modal('hide');
        this.getSubcategorias();
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
      text: "Desea realmente eliminar esta subcategoria? ",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!',
      cancelButtonText: 'Cancelar',
      allowOutsideClick: false
    }).then(() => {

      loading_show();
      this.subcategoriasService.delete(id, (data: Result) => {
        loading_hide();
        if (data.isOk) {
          swal(
            'Realizado!',
            data.Mensaje,
            'success'
          )
          this.getSubcategorias();
        }

      });
    }).catch(swal.noop)

  }

  editShow(item) {
    this.update = true;
    this.subcategoria = item;

  }

  updateSubcategoria() {
    if (!this.subcategoria.name || this.subcategoria.name == "") {
      this.alertService.warning("Ingresar nombre!");
      return;
    }

    if (!this.subcategoria.description || this.subcategoria.description == "") {
      this.alertService.warning("Ingresar descripción!");
      return;
    }

    loading_show();
    this.subcategoriasService.put(this.subcategoria.id, this.subcategoria, (data: Result) => {
      loading_hide();
      if (data.isOk) {
        this.nuevo();
        this.alertService.success(data.Mensaje);
        jQuery('#modalSubcategoria').modal('hide');
        this.getSubcategorias();
      } else {
        this.alertService.error(data.Mensaje);
      }
    });
  }

}
