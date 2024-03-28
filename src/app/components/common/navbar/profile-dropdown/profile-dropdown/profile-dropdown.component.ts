import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../../../services/sis-connect/user/user.service";
import {Storage} from "@ionic/storage-angular";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile-dropdown',
  templateUrl: './profile-dropdown.component.html',
  styleUrls: ['./profile-dropdown.component.scss'],
})
export class ProfileDropdownComponent  implements OnInit {

  constructor(
    private userService: UserService,
    private storage: Storage,
    private router: Router,
  ) { }

  async ngOnInit() {
    await this.storage.create();
    console.log('ProfileDropdownComponent');
  }


  async logout() {
    (await this.userService.logout()).subscribe(async (response) => {
      console.log(response);
      await this.storage.remove('token');
      await this.router.navigate(['login']);
    })
  }

}
