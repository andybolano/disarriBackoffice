import { viewsModule } from '../../modules/view.module';
import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { TagsService, AlertService, BlogService } from "../../services/base.import";
import { Result } from '../../services/servers.service';
import { loading_show, loading_hide } from '../../app.helpers';
import swal from 'sweetalert2';
declare var jQuery: any;

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagsComponent implements OnInit {

  public tags: Array<any> = [];
  public update: boolean = false;
  public tag: any = {};

  constructor(
    private tagsService: TagsService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.getTags();
  }

  getTags() {
    loading_show();
    this.tagsService.get((response) => {
      loading_hide();
      if (response.isOk) {
        this.tags = response.Content;
      } else {
        this.alertService.error(response.Mensaje);
      }
    });
  }

  nuevo() {
    this.update = false;
    this.tag = {
      id: 0,
      name: "",
      description: ""
    };
  }

  save() {

    if (!this.tag.name || this.tag.name == "") {
      this.alertService.warning("Ingresar nombre!");
      return;
    }

    if (!this.tag.description || this.tag.description == "") {
      this.alertService.warning("Ingresar descripción!");
      return;
    }

    loading_show();
    this.tagsService.post(this.tag, (data: Result) => {
      loading_hide();
      if (data.isOk) {
        this.nuevo();
        this.alertService.success(data.Mensaje);
        jQuery('#modalTag').modal('hide');
        this.getTags();
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
      text: "Desea realmente eliminar este tag? ",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!',
      cancelButtonText: 'Cancelar',
      allowOutsideClick: false
    }).then(() => {

      loading_show();
      this.tagsService.delete(id, (data: Result) => {
        loading_hide();
        if (data.isOk) {
          swal(
            'Realizado!',
            data.Mensaje,
            'success'
          )
          this.getTags();
        }

      });
    }).catch(swal.noop)

  }

  editShow(item) {
    this.update = true;
    this.tag = item;

  }

  updateTag() {
    if (!this.tag.name || this.tag.name == "") {
      this.alertService.warning("Ingresar nombre!");
      return;
    }

    if (!this.tag.description || this.tag.description == "") {
      this.alertService.warning("Ingresar descripción!");
      return;
    }

    loading_show();
    this.tagsService.put(this.tag.id, this.tag, (data: Result) => {
      loading_hide();
      if (data.isOk) {
        this.nuevo();
        this.alertService.success(data.Mensaje);
        jQuery('#modalTag').modal('hide');
        this.getTags();
      } else {
        this.alertService.error(data.Mensaje);
      }
    });
  }

}
