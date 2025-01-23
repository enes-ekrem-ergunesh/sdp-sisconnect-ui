import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput, IonItem, IonLabel, IonList,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {UserService} from "../../services/user/user.service";
import {catchError} from "rxjs";
import {ConfigService} from "../../services/config/config.service";
import {ProfileInfo} from "../../interfaces/profile-info";
import {Router} from "@angular/router";

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonBackButton, IonInput, IonList, IonItem, IonLabel, ReactiveFormsModule]
})
export class SearchPage implements OnInit {
  searchQuery = new FormControl('');
  searchResults: ProfileInfo[] = [];

  constructor(
    private userService: UserService,
    private configService: ConfigService,
    private router: Router
  ) { }

  ngOnInit() {
    return
  }

  async searchUser() {
    console.log(this.searchQuery.value);
    if (!this.searchQuery.value) {
      this.searchResults = []
      return
    }
    (await this.userService.searchUsers(this.searchQuery.value))
      .pipe(
        catchError(async (error) => {
          this.configService.handleError(error, "Search Error")
          throw error
        })
      )
      .subscribe((data) => {
        console.log(data)
        this.searchResults = data as ProfileInfo[]
      })
  }

  goToProfile(user_id: number) {
    window.location.href = '/profile/' + user_id
  }

}
