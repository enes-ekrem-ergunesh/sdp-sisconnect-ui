import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader, IonIcon,
  IonToolbar
} from '@ionic/angular/standalone';
import {ProfileContentComponent} from "../../components/page-contents/profile-content/profile-content.component";
import {BehaviorSubject, catchError} from "rxjs";
import {ConfigService} from "../../services/config/config.service";
import {UserService} from "../../services/user/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {personAdd, personRemove} from "ionicons/icons";
import {addIcons} from "ionicons";
import {ConnectionService} from "../../services/connection/connection.service";
import {ConnectionInfo} from "../../interfaces/connection-info";
import {CreatePostFabComponent} from "../../components/buttons/create-post-fab/create-post-fab.component";
import {User} from "../../interfaces/user";

@Component({
  selector: 'app-profile-mobile',
  templateUrl: './profile-mobile.page.html',
  styleUrls: ['./profile-mobile.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonToolbar, CommonModule, FormsModule, IonBackButton, IonButtons, ProfileContentComponent, IonButton, IonIcon, CreatePostFabComponent]
})

export class ProfileMobilePage implements OnInit {
  currentUser = new BehaviorSubject<User>({} as User)
  currentConnectionInfo = new BehaviorSubject<ConnectionInfo>({
    id: null,
    user_id: null,
    connected_user_id: null,
    accepted_at: null,
    is_blocked: null,
  })
  isConnected = false

  constructor(
    private configService: ConfigService,
    private userService: UserService,
    private connectionService: ConnectionService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    addIcons({personAdd, personRemove})
  }

  async ngOnInit() {
    const user_id = this.route.snapshot.paramMap.get('user_id');

    if (user_id) {
      if (user_id !== "0") {
        await this.getCurrentUser(user_id)
      } else {
        await this.getSelfUser()
      }
    }
    this.getConnectionInfo()
    this.onConnectionUpdate()
  }

  async getCurrentUser(user_id: any) {
    // Get the current user id
    (await this.userService.getUserById(user_id))
      .pipe(
        catchError(async (error) => {
          this.configService.handleError(error, "User Info Access Error")
          throw error
        })
      )
      .subscribe(async (data: any) => {
        this.currentUser.next(data as User);
      })
  }

  async getSelfUser() {
    // Get the current user id
    (await this.userService.getCurrentUser())
      .pipe(
        catchError(async (error) => {
          this.configService.handleError(error, "User Info Access Error")
          throw error
        })
      )
      .subscribe(async (data: any) => {
        this.currentUser.next(data as User);
      })
  }

  getConnectionInfo() {
    this.currentUser.subscribe(async (user) => {
      if (!user.id) {
        return
      }
      if (user.id !== 0) {
        // Get the connection info
        (await this.connectionService.getConnectionById(user.id))
          .pipe(
            catchError(async (error) => {
              this.configService.handleError(error, "Connection Info Access Error")
              throw error
            })
          )
          .subscribe(async (data: any) => {
            const connection_info = data as ConnectionInfo
            this.currentConnectionInfo.next(connection_info);
          })
      }
    });
  }

  onConnectionUpdate() {
    this.currentConnectionInfo.subscribe(async (connection_info) => {
      if (connection_info.is_blocked) {
        this.router.navigate(['/']).then(() => {
          window.location.reload()
        })
      }
      this.isConnected = connection_info.id !== null;
    })
  }

  async createRemoveConnection() {
    if (this.currentConnectionInfo.value.id === null) {
      (await this.connectionService.createConnection(this.currentUser.value.id))
        .pipe(
          catchError(async (error) => {
            this.configService.handleError(error, "Connection Access Error")
            throw error
          })
        )
        .subscribe(async () => {
          this.currentUser.next(this.currentUser.value)
        })
    }
    else {
      (await this.connectionService.removeConnection(this.currentUser.value.id))
        .pipe(
          catchError(async (error) => {
            this.configService.handleError(error, "Connection Access Error")
            throw error
          })
        )
        .subscribe(async () => {
          this.currentUser.next(this.currentUser.value)
        })
    }
  }

}
