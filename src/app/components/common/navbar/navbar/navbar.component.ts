import { Component, OnInit } from '@angular/core';
import {User} from "../../../../interfaces/sis-connect/user/user";
import {UserService} from "../../../../services/sis-connect/user/user.service";
import {ProfileService} from "../../../../services/sis-connect/profile/profile.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent  implements OnInit {
  user: User = {
    address: '',
    birthdate: '',
    email: '',
    family_name: '',
    first_name: '',
    gender: '',
    id: 0,
    is_admin: false,
    table: ''
  };

  constructor(
    private userService: UserService,
    private profileService: ProfileService
  ) { }

  async ngOnInit() {
    // console.log('NavbarComponent');
    await this.getUser();
  }

  async logout() {
    (await this.userService.logout())
  }

  async getUser() {
    (await this.userService.getUser()).subscribe((user) => {
      this.user = user;
    });
  }

  prepareProfileRoute() {
    return this.profileService.prepareProfileRoute(this.user)
  }

}
