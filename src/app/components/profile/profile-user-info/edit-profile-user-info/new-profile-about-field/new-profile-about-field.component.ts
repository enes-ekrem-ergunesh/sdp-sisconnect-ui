import {Component, OnInit, ViewChild} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {ProfileAboutFieldType} from "../../../../../interfaces/profile/profile-about-field-type";
import {ProfileService} from "../../../../../services/sis-connect/profile/profile.service";
import {FormControl, FormGroup} from "@angular/forms";
import {AlertService} from "../../../../../services/common/alert/alert.service";

@Component({
  selector: 'app-new-profile-about-field',
  templateUrl: './new-profile-about-field.component.html',
  styleUrls: ['./new-profile-about-field.component.scss'],
})
export class NewProfileAboutFieldComponent implements OnInit {
  @ViewChild('profileAboutFieldTypeSelect') profileAboutFieldTypeSelect: any;

  profileAboutFieldTypes!: BehaviorSubject<ProfileAboutFieldType[]>;
  newItemBeingAdded!: BehaviorSubject<boolean>;
  haveEmpty = true;
  newItemType = 'text'

  newProfileAboutFieldForm = new FormGroup({
    type: new FormControl('0'),
    name: new FormControl(''),
  });

  constructor(
    private profileService: ProfileService,
    private alertService: AlertService
  ) {
    this.profileService.initProfileAboutFieldTypes().then(() => {
    })
    this.newItemBeingAdded = profileService.getNewProfileAboutItemBeingAdded()
    this.profileAboutFieldTypes = profileService.getServiceProfileAboutFieldTypes()
  }

  ngOnInit() {
    // console.log('NewProfileAboutFieldComponent');
    this.profileService.getServiceProfileAboutFieldTypes().subscribe((data) => {
      this.haveEmpty = data.filter((item) => item.empty).length > 0;
    })
    this.newItemBeingAdded.subscribe(() => {

    })
  }

  toggleNewItemBeingAdded() {
    this.profileService.toggleNewProfileAboutItemBeingAdded()
    this.resetNewProfileAboutFieldForm()
  }

  stringDateValidator(date: string) {
    // Check if the date is in the correct format (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    return dateRegex.test(date);
  }

  onSubmit() {
    let data = this.profileAboutFieldTypes.value
    const field = data.filter((item) => item.id === parseInt(<string>this.newProfileAboutFieldForm.value.type))[0]

    if (
      <string>this.newProfileAboutFieldForm.value.name === ''
      || this.newProfileAboutFieldForm.value.name === null
    ) {
      this.alertService.createAlert(400, "Please enter a value")
      return
    }

    switch (field.data_type) {
      case 'text':
        break;
      case 'date':
        // console.log(this.newProfileAboutFieldForm.value.name)
        if (!this.stringDateValidator(<string>this.newProfileAboutFieldForm.value.name)) {
          this.alertService.createAlert(400, "Invalid date.")
          return
        } else {
          // console.log("Is a date")
        }
        break;
      case 'number':
        if (isNaN(parseInt(<string>this.newProfileAboutFieldForm.value.name))) {
          this.alertService.createAlert(400, "The value entered is not a number")
          return
        } else {
          // console.log("Is a number")
        }
        break;
      case 'email':
        if (!this.isValidEmail(<string>this.newProfileAboutFieldForm.value.name)) {
          this.alertService.createAlert(400, "Please enter a valid email")
          return
        } else {
          // console.log("Is an email")
        }
        break;
      default:
        // console.log("No data type found")
        return;
    }

    this.addProfileAboutField({
      name: <string>this.newProfileAboutFieldForm.value.name,
      type: field.data_type,
      type_name: field.name,
      type_id: field.id
    })

    this.profileService.getServiceProfileAboutFieldTypes().subscribe((data) => {
      this.haveEmpty = data.filter((item) => item.empty).length > 0;
    })

    this.toggleNewItemBeingAdded()

  }

  addProfileAboutField(data: { name: string, type: string, type_name: string, type_id: number }) {
    this.profileService.appendEditProfileAboutFields({
      created_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
      data: data.name,
      deleted_at: null,
      id: this.profileService.getTempNewProfileAboutItemId(),
      profile_field_type_data_type: data.type,
      profile_field_type_id: data.type_id,
      profile_field_type_name: data.type_name,
      profile_id: 0,
      updated_at: null
    }).then(() => {
    })
    this.profileService.setServiceProfileAboutFieldTypeEmpty(data.type_id, false)
  }

  isValidEmail(email: string): boolean {
    // Regular expression for basic email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    return emailRegex.test(email);
  }

  resetNewProfileAboutFieldForm() {
    this.newProfileAboutFieldForm.reset()
    this.profileAboutFieldTypeSelect.nativeElement.value = '0'
    this.newItemType = 'text'
  }

  onProfileAboutFieldTypeSelectChange() {
    // console.log('onProfileAboutFieldTypeSelectChange')
    this.newItemType = this.profileAboutFieldTypes.value.filter((item) => item.id === parseInt(this.profileAboutFieldTypeSelect.nativeElement.value))[0].data_type
  }
}
