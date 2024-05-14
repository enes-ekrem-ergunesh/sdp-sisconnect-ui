import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CustomIonSearchbarComponent} from "./custom-ion-searchbar.component";
import {IonicModule} from "@ionic/angular";



@NgModule({
  declarations: [CustomIonSearchbarComponent],
  exports: [CustomIonSearchbarComponent],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class CustomIonSearchbarModule { }
