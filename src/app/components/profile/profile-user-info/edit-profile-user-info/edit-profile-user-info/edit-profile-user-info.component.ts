import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProfileAboutFields} from "../../../../../interfaces/profile/profile-about-fields";
import {BehaviorSubject} from "rxjs";
import {ProfileService} from "../../../../../services/sis-connect/profile/profile.service";

@Component({
  selector: 'app-edit-profile-user-info',
  templateUrl: './edit-profile-user-info.component.html',
  styleUrls: ['./edit-profile-user-info.component.scss'],
})
export class EditProfileUserInfoComponent  implements OnInit {
  @Input() profileAboutFields: ProfileAboutFields[] = []
  @Output() data = new EventEmitter<any>();

  constructor(
    private profileService: ProfileService,
  ) {
  }

  ngOnInit() {
    console.log('EditProfileUserInfoComponent');
  }

  _save(data: any) {
    this.data.emit(data);
  }

}
