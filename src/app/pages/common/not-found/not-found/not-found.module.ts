import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotFoundPageRoutingModule } from './not-found-routing.module';

import { NotFoundPage } from './not-found.page';
import {NavbarModule} from "../../../../modules/common/navbar/navbar/navbar.module";
import {AlertModule} from "../../../../modules/common/alert/alert/alert.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotFoundPageRoutingModule,
    NavbarModule,
    AlertModule
  ],
  declarations: [NotFoundPage]
})
export class NotFoundPageModule {}
