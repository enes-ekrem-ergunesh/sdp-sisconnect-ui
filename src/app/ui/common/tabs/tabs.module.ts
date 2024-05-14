import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TabsComponent} from "./tabs.component";
import {IonicModule} from "@ionic/angular";



@NgModule({
  declarations: [TabsComponent],
  exports: [TabsComponent],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class TabsModule { }
