import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../../../services/sis-connect/user/user.service";
import {User} from "../../../../../interfaces/sis-connect/user/user";

@Component({
  selector: 'app-profile-dropdown',
  templateUrl: './profile-dropdown.component.html',
  styleUrls: ['./profile-dropdown.component.scss'],
})
export class ProfileDropdownComponent  implements OnInit {
  user !: User;

  constructor(
    private userService: UserService,
  ) {}

  async ngOnInit() {
    console.log('ProfileDropdownComponent');
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

}
