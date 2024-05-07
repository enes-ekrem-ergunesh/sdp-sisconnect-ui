import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../../../services/sis-connect/user/user.service";
import {User} from "../../../../../interfaces/sis-connect/user/user";
import {ProfileService} from "../../../../../services/sis-connect/profile/profile.service";

@Component({
  selector: 'app-profile-dropdown',
  templateUrl: './profile-dropdown.component.html',
  styleUrls: ['./profile-dropdown.component.scss'],
})
export class ProfileDropdownComponent implements OnInit {
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
  ) {
  }

  async ngOnInit() {
    // console.log('ProfileDropdownComponent');
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
