import { viewsModule } from '../../modules/view.module';
import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { ContactoService, AlertService, BlogService } from "../../services/base.import";
import { Result } from '../../services/servers.service';
import { loading_show, loading_hide } from '../../app.helpers';
import swal from 'sweetalert2';
declare var jQuery: any;

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {

  public contacto: any = {};
  constructor(
    private contactoService: ContactoService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.initSummernote();
    this.getContacto();
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

  getContacto() {
    loading_show();
    this.contactoService.get((response) => {
      loading_hide();
      if (response.isOk) {
        this.contacto.contacto = response.Content.contact;
        jQuery('#summernote').summernote('code', this.contacto.contacto);
      } else {
        this.alertService.error(response.Mensaje);
      }
    });
  }

  guardarCambios() {
    loading_show();
    this.contactoService.update(jQuery('#summernote').summernote('code'), (response) => {
      loading_hide();
      if (response.isOk) {
        this.alertService.success(response.Mensaje);
      } else {
        this.alertService.error(response.Mensaje);
      }
    });
  }

}
