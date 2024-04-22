import {Component, Input, OnInit} from '@angular/core';
import {ProfileAbout} from "../../../../../interfaces/profile/profile-about";

@Component({
  selector: 'app-edit-profile-user-info',
  templateUrl: './edit-profile-user-info.component.html',
  styleUrls: ['./edit-profile-user-info.component.scss'],
})
export class EditProfileUserInfoComponent  implements OnInit {
  @Input() profileAbout!: ProfileAbout[]



  constructor() { }

  ngOnInit() {
    console.log('EditProfileUserInfoComponent');
  }

}
