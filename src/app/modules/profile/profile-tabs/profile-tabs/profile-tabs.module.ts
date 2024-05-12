import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProfileTabsComponent} from "../../../../components/profile/profile-tabs/profile-tabs/profile-tabs.component";
import {TimelineTabModule} from "../timeline-tab/timeline-tab.module";
import {ConnectionsTabModule} from "../connections-tab/connections-tab.module";



@NgModule({
  declarations: [ProfileTabsComponent],
  exports: [ProfileTabsComponent],
  imports: [
    CommonModule,
    TimelineTabModule,
    ConnectionsTabModule
  ]
})
export class ProfileTabsModule { }
