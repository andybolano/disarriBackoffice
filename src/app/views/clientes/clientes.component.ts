import { Component , OnInit} from '@angular/core';
import { AlertService} from "../../services/base.import";
import { Result } from './../../services/servers.service';
import {loading_show, loading_hide} from '../../app.helpers';

@Component({
    selector: 'clientes',
    templateUrl: 'clientes.template.html'
})
export class clientesComponent { 
    
constructor(
    private alertService: AlertService){
    }


 ngOnInit(){
     
  }

  
}