import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProfileService} from "../../../../services/sis-connect/profile/profile.service";
import {UserService} from "../../../../services/sis-connect/user/user.service";
import {ConnectionService} from "../../../../services/sis-connect/connection/connection.service";
import {PostService} from "../../../../services/sis-connect/post/post.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private profileService: ProfileService,
    private userService: UserService,
    private postService: PostService,
    private connectionService: ConnectionService
  ) {
    this.profileService.profilePageRouteParams = this.route.params
    this.userService.profilePageRouteParams = this.route.params
    this.connectionService.profilePageRouteParams = this.route.params
    this.postService.profilePageRouteParams = this.route.params
    console.log('ProfilePage constructor')
  }

  ngOnInit() {
    console.log('ProfilePage')
    this.profileService.resetProfilePage()
    this.connectionService.profilePageRouteParams = this.route.params
  }

  protected readonly document = document;
}
