import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';
import {CustomIonSearchbarModule} from "../common/custom-ion-searchbar/custom-ion-searchbar.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ProfilePageRoutingModule,
        CustomIonSearchbarModule
    ],
  declarations: [ProfilePage]
})
export class ProfilePageModule {}
