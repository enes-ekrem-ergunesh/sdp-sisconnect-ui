import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  EditProfileUserInfoComponent
} from "../../../../components/profile/profile-user-info/edit-profile-user-info/edit-profile-user-info/edit-profile-user-info.component";



@NgModule({
  declarations: [EditProfileUserInfoComponent],
  exports: [EditProfileUserInfoComponent],
  imports: [
    CommonModule
  ]
})
export class EditProfileUserInfoModule { }
