import {Component, Input, OnInit} from '@angular/core';
import {ProfileService} from "../../../services/profile/profile.service";
import {ProfileInfo} from "../../../interfaces/profile-info";
import {ProfileSegmentComponent} from "./profile-segment/profile-segment.component";

@Component({
  selector: 'app-profile-content',
  templateUrl: './profile-content.component.html',
  styleUrls: ['./profile-content.component.scss'],
  imports: [
    ProfileSegmentComponent
  ],
  standalone: true
})
export class ProfileContentComponent  implements OnInit {
  @Input() user_id!: number;

  profileInfo!: ProfileInfo;

  constructor(
    private profileService: ProfileService
  ) { }

  async ngOnInit() {
    (await this.profileService.getProfileInfo(this.user_id)).subscribe((data: any) => {
      this.profileInfo = data
    })
    return
  }
}
