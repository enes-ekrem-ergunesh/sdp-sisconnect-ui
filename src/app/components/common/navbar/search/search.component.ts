import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";
import {UserService} from "../../../../services/sis-connect/user/user.service";
import {User} from "../../../../interfaces/sis-connect/user/user";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent  implements OnInit {
  search = new FormControl('');
  searchResults!: BehaviorSubject<User[]>

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.searchResults = this.userService.userSearchResults
    this.search.valueChanges.subscribe((value) => {
      this.userService.searchUsers(value || '').then(() => {})
    })
    return
  }

  onSubmit() {
    this.userService.searchUsers(this.search.value || '').then(() => {})
  }

  linkToProfile(result: User){
    let username = ''
    let first_name = result.first_name.split(' ')
    first_name.forEach((word) => {
      username += word
    })
    let family_name = result.family_name.split(' ')
    family_name.forEach((word) => {
      username += word
    })
    username += '_' + result.user_id
    //  lower case
    username = username.toLowerCase()
    return username
  }

  reset() {
    this.search.setValue('')
    this.userService.userSearchResults.next([])
  }
}
