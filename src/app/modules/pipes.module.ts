import { RoundPipe } from './../pipes/rounded.pipes';
import {DataFilterPipe } from './../pipes/filter.pipes';
import { OrderBy } from './../pipes/orderBy.pipes';


import { NgModule } from '@angular/core';

@NgModule({
  declarations: [OrderBy,DataFilterPipe, RoundPipe],
  exports: [OrderBy,DataFilterPipe, RoundPipe]
})
export class PipesModule { }