import {Component, OnInit} from '@angular/core';
import {ProfileService} from "../../../../services/sis-connect/profile/profile.service";
import {ProfileAbout} from "../../../../interfaces/profile/profile-about";

@Component({
  selector: 'app-profile-user-info',
  templateUrl: './profile-user-info.component.html',
  styleUrls: ['./profile-user-info.component.scss'],
})
export class ProfileUserInfoComponent implements OnInit {
  profileAbout!: ProfileAbout[]

  constructor(
    private profileService: ProfileService
  ) {
  }

  async ngOnInit() {
    console.log('ProfileUserInfoComponent')
    await this.getProfileAbout()
  }

  async getProfileAbout() {
    // (await this.profileService.getProfileAbout()).subscribe((data) => {
    //   this.profileAbout = data;
    //   console.log(this.profileAbout)
    // });
    (await this.profileService.getProfileId()).subscribe(async (data) => {
      (await this.profileService.getProfileAbout(data.id)).subscribe((data) => {
        this.profileAbout = data;
        console.log(this.profileAbout)
      });
    });
  }


}
