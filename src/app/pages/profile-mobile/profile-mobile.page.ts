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

@Component({
  selector: 'app-profile-mobile',
  templateUrl: './profile-mobile.page.html',
  styleUrls: ['./profile-mobile.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonToolbar, CommonModule, FormsModule, IonBackButton, IonButtons, ProfileContentComponent, IonButton, IonIcon]
})

export class ProfileMobilePage implements OnInit {
  current_user_id = new BehaviorSubject<number>(0)
  current_connection_info = new BehaviorSubject<ConnectionInfo>({
    id: null,
    user_id: null,
    connected_user_id: null,
    accepted_at: null,
    is_blocked: null,
  })
  is_connected = false

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
        try {
          this.current_user_id.next(Number(user_id))
        } catch (error) {
          this.configService.handleError(error, "Profile ID Error")
        }
      } else {
        await this.getCurrentProfileId()
      }
    }
    this.getConnectionInfo()
    this.onConnectionUpdate()
  }

  async getCurrentProfileId() {
    // Get the current user id
    (await this.userService.getCurrentUser())
      .pipe(
        catchError(async (error) => {
          this.configService.handleError(error, "User Info Access Error")
          throw error
        })
      )
      .subscribe(async (data: any) => {
        this.current_user_id.next(data.id);
      })
  }

  getConnectionInfo() {
    this.current_user_id.subscribe(async (user_id) => {
      if (user_id !== 0) {
        // Get the connection info
        (await this.connectionService.getConnectionById(user_id))
          .pipe(
            catchError(async (error) => {
              this.configService.handleError(error, "Connection Info Access Error")
              throw error
            })
          )
          .subscribe(async (data: any) => {
            const connection_info = data as ConnectionInfo
            console.warn(connection_info)
            this.current_connection_info.next(connection_info);
          })
      }
    });
  }

  onConnectionUpdate() {
    this.current_connection_info.subscribe(async (connection_info) => {
      if (connection_info.is_blocked) {
        this.router.navigate(['/']).then(() => {
          window.location.reload()
        })
      }
      this.is_connected = connection_info.id !== null;
    })
  }

  async createRemoveConnection() {
    if (this.current_connection_info.value.id === null) {
      (await this.connectionService.createConnection(this.current_user_id.value))
        .pipe(
          catchError(async (error) => {
            this.configService.handleError(error, "Connection Access Error")
            throw error
          })
        )
        .subscribe(async () => {
          this.current_user_id.next(this.current_user_id.value)
        })
    }
    else {
      (await this.connectionService.removeConnection(this.current_user_id.value))
        .pipe(
          catchError(async (error) => {
            this.configService.handleError(error, "Connection Access Error")
            throw error
          })
        )
        .subscribe(async () => {
          this.current_user_id.next(this.current_user_id.value)
        })
    }
  }

}
