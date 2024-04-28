import {Component, OnInit} from '@angular/core';
import {ProfileService} from "../../../../services/sis-connect/profile/profile.service";
import {ProfileAboutFields} from "../../../../interfaces/profile/profile-about-fields";
import {FormArray, FormControl} from "@angular/forms";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-profile-user-info',
  templateUrl: './profile-user-info.component.html',
  styleUrls: ['./profile-user-info.component.scss'],
})
export class ProfileUserInfoComponent implements OnInit {
  profileAboutFields: ProfileAboutFields[] = []

  localProfileAboutFields!: BehaviorSubject<ProfileAboutFields[]>;

  constructor(
    private profileService: ProfileService,
  ) {
    this.localProfileAboutFields = profileService.getLocalProfileAboutFields()
  }

  async ngOnInit() {
    console.log('ProfileUserInfoComponent')
    await this.getProfileAboutFields()
  }

  async getProfileAboutFields() {
    (await this.profileService.getProfileId()).subscribe(async (data) => {
      (await this.profileService.getProfileAboutFields(data.id)).subscribe((data: ProfileAboutFields[]) => {
        this.profileAboutFields = data
      })
    });
  }

  async onSaved(data: any) {
    if (data.submitted) {
      await this.profileService.updateProfileAboutFields(this.profileAboutFields)
      await this.getProfileAboutFields()
    } else {
      setTimeout(async () => {
        await this.getProfileAboutFields()
        this.resetForm(data.form, data.fields)
      }, 200)
    }
  }

  resetForm(form: FormArray<any>, fields: ProfileAboutFields[]) {
    this.profileService.resetNewProfileAboutItemBeingAdded()
    form.clear()
    fields.forEach((field) => {
      form.push(
        new FormControl(field.data)
      );
    })
  }

}
