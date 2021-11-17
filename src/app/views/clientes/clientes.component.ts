import { Component} from '@angular/core';
import { AlertService, ClientesService, ExcelService } from "../../services/base.import";
import { Result } from './../../services/servers.service';
import { loading_show, loading_hide } from '../../app.helpers';

@Component({
    selector: 'clientesComponent',
    templateUrl: 'clientes.template.html'
})
export class clientesComponent {
    
  
    fileName:string = "Clientes";
    constructor(
        private alertService: AlertService,
        private clientesService: ClientesService,
        private excel: ExcelService
    ) {

    }

    public clientes = [];
    public filter="";

    ngOnInit() {
       this.getAll();
    }

    downloadExcel(): void{
        this.excel.exportAsExcelFile(this.clientes, this.fileName);
    }

    getAll(){
         loading_show();
            this.clientesService.getAll((data: Result) => {
                loading_hide();
                if (data.isOk) {
                    this.clientes = data.Content;
                } else {
                    this.alertService.error(data.Mensaje);
                }
            });
    }
}