import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProfileService} from "../../../../../services/sis-connect/profile/profile.service";
import {ProfileAboutFields} from "../../../../../interfaces/profile/profile-about-fields";
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-edit-profile-user-info-form',
  templateUrl: './edit-profile-user-info-form.component.html',
  styleUrls: ['./edit-profile-user-info-form.component.scss'],
})
export class EditProfileUserInfoFormComponent implements OnInit {
  @Input() profileAboutFields: ProfileAboutFields[] = [
    {
      created_at: '',
      data: '',
      deleted_at: '',
      id: 0,
      profile_field_type_data_type: '',
      profile_field_type_id: 0,
      profile_field_type_name: '',
      profile_id: 0,
      updated_at: ''
    }
  ]
  @Output() data = new EventEmitter<any>();

  profileAboutForm!: FormGroup;
  profileAboutFormArray!: FormArray;


  constructor(
    private profileService: ProfileService,
    private fb: FormBuilder
  ) {
  }

  async ngOnInit() {
    console.log('EditProfileUserInfoFormComponent');
    this.profileAboutForm = this.fb.group({
      profileAboutFormArray: this.fb.array([])
    });
    this.profileAboutFormArray = this.profileAboutForm.get('profileAboutFormArray') as FormArray;
    (await this.profileService.getProfileAboutFields(5)).subscribe((data) => {
      data.forEach((field) => {
        this.formAddItem(field.data)
      })
      this.profileAboutFields = data
    })
  }

  formAddItem(value: string) {
    this.profileAboutFormArray.push(
      new FormControl(value)
    );
  }

  _save(submitted: boolean) {
    if (!submitted) {
      this.data.emit({submitted: submitted, form: this.profileAboutFormArray, fields: this.profileAboutFields});
    } else {
      this.data.emit({submitted: submitted, form: null, fields: null});
    }
  }

  removeProfileAboutField(id: number) {
    const index = this.profileAboutFields.findIndex((field) => field.id === id)
    this.profileAboutFields[index].deleted_at = new Date().toISOString().slice(0, 19).replace('T', ' ')
    console.log(this.profileAboutFields)
  }

  addProfileAboutField(data: {name: string, type: string, type_name: string, type_id: number}) {
    this.profileAboutFields.push({
      created_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
      data: data.name,
      deleted_at: '',
      id: 0,
      profile_field_type_data_type: data.type,
      profile_field_type_id: data.type_id,
      profile_field_type_name: data.type_name,
      profile_id: 5,
      updated_at: ''
    })
  }

  onSubmit() {
    for (let i = 0; i < this.profileAboutFields.length; i++) {
      this.profileAboutFields[i].data = this.profileAboutFormArray.value[i]
    }
    console.log(this.profileAboutFields)
    this._save(true)
  }

}
