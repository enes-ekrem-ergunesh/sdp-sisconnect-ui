import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MessagesPageRoutingModule } from './messages-routing.module';

import { MessagesPage } from './messages.page';
import {CustomIonSearchbarModule} from "../common/custom-ion-searchbar/custom-ion-searchbar.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        MessagesPageRoutingModule,
        CustomIonSearchbarModule
    ],
  declarations: [MessagesPage]
})
export class MessagesPageModule {}
