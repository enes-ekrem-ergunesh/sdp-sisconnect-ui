import {Component, OnInit} from '@angular/core';
import {ProfileService} from "../../../../services/sis-connect/profile/profile.service";
import {ProfileAboutFields} from "../../../../interfaces/profile/profile-about-fields";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-profile-user-info',
  templateUrl: './profile-user-info.component.html',
  styleUrls: ['./profile-user-info.component.scss'],
})
export class ProfileUserInfoComponent implements OnInit {
  infoProfileAboutFields!: BehaviorSubject<ProfileAboutFields[]>;
  isEmpty!: BehaviorSubject<boolean>;

  constructor(
    private profileService: ProfileService,
  ) {
    this.profileService.initProfileAboutFields().then(() => {
      // console.log('initLocalProfileAboutFields')
    });
    this.infoProfileAboutFields = profileService.getInfoProfileAboutFields()
  }

  async ngOnInit() {
    // console.log('ProfileUserInfoComponent')
    this.infoProfileAboutFields.subscribe((data) => {
      // console.log('profile-user-info.component.ts>localProfileAboutFields', data)
      this.isEmpty = new BehaviorSubject<boolean>(data.filter((item) => !item.deleted_at).length === 0)
    })
  }

}
