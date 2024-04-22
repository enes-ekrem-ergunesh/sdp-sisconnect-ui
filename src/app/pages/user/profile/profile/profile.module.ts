import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';
import {NavbarModule} from "../../../../modules/common/navbar/navbar/navbar.module";
import {UpperProfileModule} from "../../../../modules/profile/upper-profile/upper-profile.module";
import {ProfileUserInfoModule} from "../../../../modules/profile/profile-user-info/profile-user-info.module";
import {AlertModule} from "../../../../modules/common/alert/alert/alert.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ProfilePageRoutingModule,
        NavbarModule,
        UpperProfileModule,
        ProfileUserInfoModule,
        AlertModule
    ],
  declarations: [ProfilePage]
})
export class ProfilePageModule {}
