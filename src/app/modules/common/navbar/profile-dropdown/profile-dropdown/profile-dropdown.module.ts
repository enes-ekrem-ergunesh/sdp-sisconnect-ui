import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ProfileDropdownComponent
} from "../../../../../components/common/navbar/profile-dropdown/profile-dropdown/profile-dropdown.component";



@NgModule({
  declarations: [ProfileDropdownComponent],
  exports: [ProfileDropdownComponent],
  imports: [
    CommonModule
  ]
})
export class ProfileDropdownModule { }
