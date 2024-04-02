import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {HomePage} from './home.page';

import {HomePageRoutingModule} from './home-routing.module';
import {AlertModule} from "../../../modules/common/alert/alert/alert.module";
import {NavbarModule} from "../../../modules/common/navbar/navbar/navbar.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    AlertModule,
    NavbarModule
  ],
  exports: [],
  declarations: [HomePage]
})
export class HomePageModule {
}
