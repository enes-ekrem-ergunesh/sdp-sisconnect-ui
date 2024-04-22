import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProfileUserInfoComponent} from "../../../components/profile/profile-user-info/profile-user-info/profile-user-info.component";
import {EditProfileUserInfoModule} from "./edit-profile-user-info/edit-profile-user-info.module";



@NgModule({
  declarations: [ProfileUserInfoComponent],
  exports: [ProfileUserInfoComponent],
  imports: [
    CommonModule,
    EditProfileUserInfoModule
  ]
})
export class ProfileUserInfoModule { }
