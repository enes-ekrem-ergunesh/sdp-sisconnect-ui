import {importProvidersFrom, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from "@angular/common/http";

import {IonicStorageModule} from '@ionic/storage-angular';
import {AlertComponent} from "./components/common/alert/alert/alert.component";

@NgModule({
  declarations: [AppComponent, AlertComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, IonicStorageModule.forRoot()],
  exports: [AlertComponent],
  providers: [{provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    importProvidersFrom(HttpClientModule)
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
