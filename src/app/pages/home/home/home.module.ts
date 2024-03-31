import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {HomePage} from './home.page';

import {HomePageRoutingModule} from './home-routing.module';
import {NavbarComponent} from "../../../components/common/navbar/navbar/navbar.component";
import {
  ProfileDropdownComponent
} from "../../../components/common/navbar/profile-dropdown/profile-dropdown/profile-dropdown.component";
import {AppModule} from "../../../app.module";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    AppModule
  ],
  declarations: [HomePage, NavbarComponent, ProfileDropdownComponent]
})
export class HomePageModule {
}
