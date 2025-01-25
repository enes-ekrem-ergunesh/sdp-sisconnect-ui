import {Component, ElementRef, OnInit, ViewChild, viewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput, IonItem, IonLabel, IonList,
  IonToolbar
} from '@ionic/angular/standalone';
import {UserService} from "../../services/user/user.service";
import {BehaviorSubject, catchError} from "rxjs";
import {ConfigService} from "../../services/config/config.service";
import {ProfileInfo} from "../../interfaces/profile-info";
import {ConnectionService} from "../../services/connection/connection.service";
import {SearchResult} from "../../interfaces/search-result";
import {ConnectionInfo} from "../../interfaces/connection-info";
import {addIcons} from "ionicons";
import {closeCircle, closeCircleOutline} from "ionicons/icons";

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonToolbar, CommonModule, FormsModule, IonButtons, IonBackButton, IonInput, IonList, IonItem, IonLabel, ReactiveFormsModule]
})
export class SearchPage implements OnInit {
  @ViewChild('searchInput', { static: false }) searchInput!: IonInput;
  searchQuery = new FormControl('');
  profiles = new BehaviorSubject<ProfileInfo[]>([]);
  searchResults: SearchResult[] = [];

  constructor(
    private userService: UserService,
    private configService: ConfigService,
    private connectionService: ConnectionService,
  ) {
    addIcons({closeCircleOutline, closeCircle})
  }

  ngOnInit() {
    this.getConnectionInfos()
    setTimeout(() => {
      console.log('focus')
      this.searchInput.setFocus().then()
    }, 400)
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
        this.profiles.next(data as ProfileInfo[]);
      })
  }

  goToProfile(user_id: number|null) {
    window.location.href = '/profile/' + user_id
  }

  getConnectionInfos() {
    this.profiles.subscribe(async (profiles) => {
      this.searchResults = []
      for (const profile of profiles) {
        (await this.connectionService.getConnectionById(profile.user_id))
          .pipe(
            catchError(async (error) => {
              this.configService.handleError(error, "Connection Info Access Error")
              throw error
            })
          )
          .subscribe(async (connection: any) => {
            const conn = connection as ConnectionInfo
            const searchResult = {
              id: profile.user_id,
              user_id: profile.user_id,
              email: profile.email,
              first_name: profile.first_name,
              last_name: profile.last_name,
              is_admin: profile.is_admin,
              is_blocked: conn.is_blocked,
            }
            this.searchResults.push(searchResult);
          })
      }
    });
  }


}
