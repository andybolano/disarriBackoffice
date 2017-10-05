
import { HttpService } from './config/http.service';
import { ServicesModule } from './modules/services.module';

import { viewsModule } from './modules/view.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule, XHRBackend, RequestOptions } from '@angular/http';
import { RouterModule } from "@angular/router";
import { LocationStrategy, HashLocationStrategy, PathLocationStrategy, CurrencyPipe  } from '@angular/common';

import { ROUTES } from "./app.routes";
import { AppComponent } from './app.component';


// App modules/components
import { LayoutsModule } from "./components/common/layouts/layouts.module";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    // Angular modules
    BrowserModule,
    HttpModule,
    viewsModule,
   

    // Modules
    LayoutsModule,
    ServicesModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [
    { provide: LocationStrategy, useClass: PathLocationStrategy  },
     HttpService,
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
