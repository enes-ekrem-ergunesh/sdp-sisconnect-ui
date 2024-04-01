import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../../../services/sis-connect/user/user.service";

@Component({
  selector: 'app-profile-dropdown',
  templateUrl: './profile-dropdown.component.html',
  styleUrls: ['./profile-dropdown.component.scss'],
})
export class ProfileDropdownComponent  implements OnInit {

  constructor(
    private userService: UserService,
  ) { }

  async ngOnInit() {
    console.log('ProfileDropdownComponent');
  }


  async logout() {
    (await this.userService.logout())
  }

}
