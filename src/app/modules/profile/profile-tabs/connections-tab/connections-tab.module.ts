import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ConnectionsTabComponent
} from "../../../../components/profile/profile-tabs/connections-tab/connections-tab/connections-tab.component";



@NgModule({
  declarations: [ConnectionsTabComponent],
  exports: [ConnectionsTabComponent],
  imports: [
    CommonModule
  ]
})
export class ConnectionsTabModule { }
