import { NgModule } from '@angular/core';
import {DataTableModule} from "angular2-datatable-custom";

@NgModule({
  imports: [
    DataTableModule
  ],
  exports: [
    DataTableModule
  ]
})
export class pluginsModule { }