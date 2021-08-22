import { viewsModule } from '../../modules/view.module';
import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { CategoriasService, AlertService, BlogService, SubcategoriasService } from "../../services/base.import";
import { Result } from '../../services/servers.service';
import { loading_show, loading_hide } from '../../app.helpers';
import swal from 'sweetalert2';
import { ActivatedRoute, Router, Routes } from '@angular/router';
declare var jQuery: any;

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  public filter = "";
  public categorias: Array<any> = [];
  public update: boolean = false;
  public categoria: any = {};

  constructor(
    private categoriasService: CategoriasService,
    private alertService: AlertService,
    private router: Router 
  ) { 
  }

  ngOnInit() {
    this.getCategorias();
  }

  getCategorias() {
    loading_show();
    this.categoriasService.get((response) => {
      loading_hide();
      if (response.isOk) {
        this.categorias = response.Content;
      } else {
        this.alertService.error(response.Mensaje);
      }
    });
  }

  nuevo() {
    this.update = false;
    this.categoria = {
      id: 0,
      name: "",
      description: ""
    };
  }

  save() {

    if (!this.categoria.name || this.categoria.name == "") {
      this.alertService.warning("Ingresar nombre!");
      return;
    }

    if (!this.categoria.description || this.categoria.description == "") {
      this.alertService.warning("Ingresar descripción!");
      return;
    }

    loading_show();
    this.categoriasService.post(this.categoria, (data: Result) => {
      loading_hide();
      if (data.isOk) {
        this.nuevo();
        this.alertService.success(data.Mensaje);
        jQuery('#modalCategoria').modal('hide');
        this.getCategorias();
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
      text: "Desea realmente eliminar esta categoria? ",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!',
      cancelButtonText: 'Cancelar',
      allowOutsideClick: false
    }).then(() => {

      loading_show();
      this.categoriasService.delete(id, (data: Result) => {
        loading_hide();
        if (data.isOk) {
          swal(
            'Realizado!',
            data.Mensaje,
            'success'
          )
          this.getCategorias();
        }

      });
    }).catch(swal.noop)

  }

  editShow(item) {
    this.update = true;
    this.categoria = item;

  }

  updateCategoria() {
    if (!this.categoria.name || this.categoria.name == "") {
      this.alertService.warning("Ingresar nombre!");
      return;
    }

    if (!this.categoria.description || this.categoria.description == "") {
      this.alertService.warning("Ingresar descripción!");
      return;
    }

    loading_show();
    this.categoriasService.put(this.categoria.id, this.categoria, (data: Result) => {
      loading_hide();
      if (data.isOk) {
        this.nuevo();
        this.alertService.success(data.Mensaje);
        jQuery('#modalCategoria').modal('hide');
        this.getCategorias();
      } else {
        this.alertService.error(data.Mensaje);
      }
    });
  }

  verSubcategorias(item: any){
    localStorage.setItem("categoria", JSON.stringify(item));
    this.router.navigate(['/subcategorias']);
  }

}
