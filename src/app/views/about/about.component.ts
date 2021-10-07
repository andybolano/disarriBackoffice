import { viewsModule } from './../../modules/view.module';
import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { AboutService, AlertService, BlogService } from "../../services/base.import";
import { Result } from './../../services/servers.service';
import { loading_show, loading_hide } from '../../app.helpers';
import swal from 'sweetalert2';
declare var jQuery: any;

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  public about: any = {};
  constructor(
    private aboutService: AboutService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.initSummernote();
    this.getAbout();
  }

  initSummernote() {
    jQuery('#summernote').summernote({
      toolbar: [
        // [groupName, [list of button]]
        ['fontname', ['GothamBook']],
        ['style', ['bold', 'italic', 'underline', 'clear']],
        ['font', ['GothamBook']],
        ['fontsize', ['fontsize']],
        ['color', ['color']],
        ['para', ['ul', 'ol', 'paragraph']],
        ['height', ['300']],
      ],
      height: 280
    });

    jQuery('#summernote').summernote('fontName', 'GothamBook');
  }

  getAbout() {
    loading_show();
    this.aboutService.get((response) => {
      loading_hide();
      if (response.isOk) {
        this.about.about = response.Content.about;
        jQuery('#summernote').summernote('code', this.about.about);
      } else {
        this.alertService.error(response.Mensaje);
      }
    });
  }

  guardarCambios() {
    loading_show();
    this.aboutService.update(jQuery('#summernote').summernote('code'), (response) => {
      loading_hide();
      if (response.isOk) {
        this.alertService.success(response.Mensaje);
      } else {
        this.alertService.error(response.Mensaje);
      }
    });
  }

}
