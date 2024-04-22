import { Component, OnInit } from '@angular/core';
import {User} from "../../../interfaces/sis-connect/user/user";
import {UserService} from "../../../services/sis-connect/user/user.service";

@Component({
  selector: 'app-upper-profile',
  templateUrl: './upper-profile.component.html',
  styleUrls: ['./upper-profile.component.scss'],
})
export class UpperProfileComponent implements OnInit {
  user!: User

  constructor(private userService: UserService) { }

  async ngOnInit() {
    console.log('UpperProfileComponent')
    await this.getUser();
  }

  async getUser() {
    (await this.userService.getUser()).subscribe((user) => {
      this.user = user;
    });
  }

}
