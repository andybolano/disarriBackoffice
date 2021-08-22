import { viewsModule } from '../../modules/view.module';
import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { TiendasService, AlertService, BlogService } from "../../services/base.import";
import { Result } from '../../services/servers.service';
import { loading_show, loading_hide } from '../../app.helpers';
import swal from 'sweetalert2';
declare var jQuery: any;

@Component({
  selector: 'app-tiendas',
  templateUrl: './tiendas.component.html',
  styleUrls: ['./tiendas.component.css']
})
export class TiendasComponent implements OnInit {

  public tiendas: any = {};
  constructor(
    private tiendasService: TiendasService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.initSummernote();
    this.getTiendas();
  }

  initSummernote() {
    jQuery('#summernote').summernote({
      toolbar: [
        // [groupName, [list of button]]
        ['style', ['bold', 'italic', 'underline', 'clear']],
        ['font', ['strikethrough', 'superscript', 'subscript']],
        ['fontsize', ['fontsize']],
        ['color', ['color']],
        ['para', ['ul', 'ol', 'paragraph']],
        ['height', ['300']],

      ],
      height: 280
    });
  }

  getTiendas() {
    loading_show();
    this.tiendasService.get((response) => {
      loading_hide();
      if (response.isOk) {
        this.tiendas.tiendas = response.Content.tiendas;
        jQuery('#summernote').summernote('code', this.tiendas.tiendas);
      } else {
        this.alertService.error(response.Mensaje);
      }
    });
  }

  guardarCambios() {
    loading_show();
    this.tiendasService.update(jQuery('#summernote').summernote('code'), (response) => {
      loading_hide();
      if (response.isOk) {
        this.alertService.success(response.Mensaje);
      } else {
        this.alertService.error(response.Mensaje);
      }
    });
  }

}
