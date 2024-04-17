import { Component, OnInit } from '@angular/core';
import {User} from "../../../../interfaces/sis-connect/user/user";
import {UserService} from "../../../../services/sis-connect/user/user.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent  implements OnInit {
  user !: User;

  constructor(private userService: UserService) { }

  async ngOnInit() {
    console.log('NavbarComponent');
    await this.getUser();
  }

  async getUser() {
    (await this.userService.getUser()).subscribe((user) => {
      this.user = user;
    });
  }

}
