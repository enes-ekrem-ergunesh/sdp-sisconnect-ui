import {Component, OnInit, ViewChild} from '@angular/core';
import {ProfileService} from "../../../../../services/sis-connect/profile/profile.service";
import {ProfileAboutFields} from "../../../../../interfaces/profile/profile-about-fields";
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {BehaviorSubject} from "rxjs";
import {AlertService} from "../../../../../services/common/alert/alert.service";

@Component({
  selector: 'app-edit-profile-user-info-form',
  templateUrl: './edit-profile-user-info-form.component.html',
  styleUrls: ['./edit-profile-user-info-form.component.scss'],
})
export class EditProfileUserInfoFormComponent implements OnInit {
  @ViewChild('closeButton') closeButton: any;

  editProfileAboutFields!: BehaviorSubject<ProfileAboutFields[]>;

  profileAboutForm!: FormGroup;
  profileAboutFormArray!: FormArray;

  constructor(
    private profileService: ProfileService,
    private fb: FormBuilder,
    private alertService: AlertService
  ) {
    this.editProfileAboutFields = profileService.getEditProfileAboutFields()
  }

  async ngOnInit() {
    // console.log('EditProfileUserInfoFormComponent');
    this.profileAboutForm = this.fb.group({
      profileAboutFormArray: this.fb.array([])
    });
    this.profileAboutFormArray = this.profileAboutForm.get('profileAboutFormArray') as FormArray;
    this.editProfileAboutFields.subscribe((fields) => {
      this.profileAboutFormArray.clear()
      fields.forEach((field) => {
        if (field.data !== null) this.formAddItem(field.data)
      })
    })
  }

  formAddItem(value: string) {
    this.profileAboutFormArray.push(
      new FormControl(value)
    );
  }

  removeProfileAboutField(id: number) {
    this.profileService.removeFromEditProfileAboutFields(id)
  }

  onSubmit() {
    // Validate
    for (let i = 0; i < this.profileAboutFormArray.controls.length; i++) {
      if (this.profileAboutFormArray.controls[i].value === '' ||
        this.profileAboutFormArray.controls[i].value === null ||
        this.profileAboutFormArray.controls[i].value === undefined) {
        this.alertService.createAlert(
          400,
           'Field is required: "' + this.editProfileAboutFields.value[i].profile_field_type_name + '".'
        )
        // console.log(this.editProfileAboutFields.value[i].profile_field_type_name)
        return
      }
    }

    for (let i = 0; i < this.profileAboutFormArray.controls.length; i++) {
      this.editProfileAboutFields.value[i].data = this.profileAboutFormArray.controls[i].value
    }
    this.profileService.updateProfileAboutFields(this.editProfileAboutFields.value).then(() => {
      this.profileService.fetchInfoProfileAboutFields()
    })
    this.closeButton.nativeElement.click() // close modal
  }

  onCancel() {
      this.profileService.onProfileAboutModalClose()
  }

}
