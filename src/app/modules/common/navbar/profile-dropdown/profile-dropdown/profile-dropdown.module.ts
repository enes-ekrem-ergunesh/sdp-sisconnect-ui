import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ProfileDropdownComponent
} from "../../../../../components/common/navbar/profile-dropdown/profile-dropdown/profile-dropdown.component";
import {RouterLink, RouterLinkActive} from "@angular/router";



@NgModule({
  declarations: [ProfileDropdownComponent],
  exports: [ProfileDropdownComponent],
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive
  ]
})
export class ProfileDropdownModule { }
