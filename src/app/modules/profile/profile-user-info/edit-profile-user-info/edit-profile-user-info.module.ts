import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  EditProfileUserInfoComponent
} from "../../../../components/profile/profile-user-info/edit-profile-user-info/edit-profile-user-info/edit-profile-user-info.component";
import {EditProfileUserInfoFormModule} from "./edit-profile-user-info-form/edit-profile-user-info-form.module";



@NgModule({
  declarations: [EditProfileUserInfoComponent],
  exports: [EditProfileUserInfoComponent],
  imports: [
    CommonModule,
    EditProfileUserInfoFormModule
  ]
})
export class EditProfileUserInfoModule { }
