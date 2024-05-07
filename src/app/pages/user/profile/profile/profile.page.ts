import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProfileService} from "../../../../services/sis-connect/profile/profile.service";
import {UserService} from "../../../../services/sis-connect/user/user.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private profileService: ProfileService,
    private userService: UserService
  ) {
    this.profileService.profilePageRouteParams = this.route.params
    this.userService.profilePageRouteParams = this.route.params
    console.log('ProfilePage constructor')
  }

  ngOnInit() {
    console.log('ProfilePage')
    this.profileService.resetProfilePage()
  }

  protected readonly document = document;
}
