import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  EditProfileUserInfoFormComponent
} from "../../../../../components/profile/profile-user-info/edit-profile-user-info/edit-profile-user-info-form/edit-profile-user-info-form.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
    NewProfileAboutFieldComponent
} from "../../../../../components/profile/profile-user-info/edit-profile-user-info/new-profile-about-field/new-profile-about-field.component";



@NgModule({
    declarations: [EditProfileUserInfoFormComponent, NewProfileAboutFieldComponent],
  exports: [EditProfileUserInfoFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class EditProfileUserInfoFormModule { }
