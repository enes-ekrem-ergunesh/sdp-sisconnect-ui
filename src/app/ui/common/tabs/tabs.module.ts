import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TabsComponent} from "./tabs.component";
import {IonicModule} from "@ionic/angular";
import {RouterLink} from "@angular/router";
import {CustomIonSearchbarModule} from "../custom-ion-searchbar/custom-ion-searchbar.module";



@NgModule({
  declarations: [TabsComponent],
  exports: [TabsComponent],
    imports: [
        CommonModule,
        IonicModule,
        RouterLink,
        CustomIonSearchbarModule
    ]
})
export class TabsModule { }
