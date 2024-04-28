import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
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
  @Output() newProfileAboutField = new EventEmitter<{ name: string, type: string, type_name: string, type_id: number }>();

  profileAboutFieldTypes!: Observable<ProfileAboutFieldType[]>
  newItemBeingAdded!: BehaviorSubject<boolean>;

  newProfileAboutFieldForm = new FormGroup({
    type: new FormControl(''),
    name: new FormControl(''),
  });

  constructor(
    private profileService: ProfileService,
    private alertService: AlertService
  ) {
    this.getProfileAboutFieldTypes().then(() => console.log('ProfileAboutFieldTypes: ', this.profileAboutFieldTypes));
    this.newItemBeingAdded = profileService.getNewProfileAboutItemBeingAdded()
  }

  ngOnInit() {
    console.log('NewProfileAboutFieldComponent');
  }

  toggleNewItemBeingAdded() {
    this.profileService.toggleNewProfileAboutItemBeingAdded()
  }

  async getProfileAboutFieldTypes() {
    // (await this.profileService.getProfileAboutFieldTypes()).subscribe((data) => {
    //   this.profileAboutFieldTypes = data
    //   console.log("this.profileAboutFieldTypes: ", this.profileAboutFieldTypes)
    // });
    this.profileAboutFieldTypes = (await this.profileService.getProfileAboutFieldTypes())
  }

  stringDateValidator(date: string) {
    // Check if the date is in the correct format (DD/MM/YYYY)
    const dateArray = date.split('/')
    if (dateArray.length !== 3) {
      return false
    }
    if (dateArray[0].length !== 2 || dateArray[1].length !== 2 || dateArray[2].length !== 4) {
      return false
    }
    return !(isNaN(parseInt(dateArray[0])) || isNaN(parseInt(dateArray[1])) || isNaN(parseInt(dateArray[2])));

  }

  onSubmit() {
    console.log("this.newProfileAboutFieldForm.value:", this.newProfileAboutFieldForm.value)
    this.profileAboutFieldTypes.subscribe((data) => {
      console.log("data: ", data.filter((item) => item.id === parseInt(<string>this.newProfileAboutFieldForm.value.type))[0])
      const field = data.filter((item) => item.id === parseInt(<string>this.newProfileAboutFieldForm.value.type))[0]

      if (<string>this.newProfileAboutFieldForm.value.name === '') {
        this.alertService.createAlert(400, "Please enter a value")
      }

      switch (field.data_type) {
        case 'text':
          break;
        case 'date':
          if (!this.stringDateValidator(<string>this.newProfileAboutFieldForm.value.name)) {
            this.alertService.createAlert(400, "Please enter a valid date in the format DD/MM/YYYY")
          } else {
            console.log("Is a date")
          }
          break;
        case 'number':
          if (isNaN(parseInt(<string>this.newProfileAboutFieldForm.value.name))) {
            this.alertService.createAlert(400, "The value entered is not a number")
          } else {
            console.log("Is a number")
          }
          break;
        default:
          console.log("No data type found")
      }

      this.pushToEditForm({
        name: <string>this.newProfileAboutFieldForm.value.name,
        type: field.data_type,
        type_name: field.name,
        type_id: field.id
      })

      this.toggleNewItemBeingAdded()
    })
  }

  pushToEditForm(newProfileAboutField: { name: string, type: string, type_name: string, type_id: number }) {
    this.newProfileAboutField.emit(newProfileAboutField);
  }

}
