import {Component, OnInit} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {ProfileService} from "../../../../../services/sis-connect/profile/profile.service";

@Component({
  selector: 'app-edit-profile-user-info',
  templateUrl: './edit-profile-user-info.component.html',
  styleUrls: ['./edit-profile-user-info.component.scss'],
})
export class EditProfileUserInfoComponent  implements OnInit {
  owned!: BehaviorSubject<boolean>;

  constructor(
    private profileService: ProfileService,
  ) {
    this.owned = this.profileService.isProfileOwned()
  }

  ngOnInit() {
    console.log('EditProfileUserInfoComponent');
  }

  onClose(){
    this.profileService.onProfileAboutModalClose();
  }


}
