import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, catchError} from "rxjs";
import {ConnectionInfo} from "../../../interfaces/connection-info";
import {ConnectionService} from "../../../services/connection/connection.service";
import {IonButton, IonIcon, IonItem, IonLabel, IonList} from "@ionic/angular/standalone";
import {NgForOf, NgIf} from "@angular/common";
import {UserService} from "../../../services/user/user.service";
import {ConfigService} from "../../../services/config/config.service";
import {ProfileService} from "../../../services/profile/profile.service";
import {ProfileInfo} from "../../../interfaces/profile-info";
import {addIcons} from "ionicons";
import {closeCircle, closeCircleOutline} from "ionicons/icons";
import {ConnectionPageItem} from "../../../interfaces/connection-page-item";

@Component({
  selector: 'app-connections-content',
  templateUrl: './connections-content.component.html',
  styleUrls: ['./connections-content.component.scss'],
  imports: [
    IonList,
    IonItem,
    IonLabel,
    NgForOf,
    NgIf,
    IonButton,
    IonIcon
  ],
  standalone: true
})
export class ConnectionsContentComponent implements OnInit {
  connections = new BehaviorSubject<ConnectionInfo[]>([])
  connectionItems = new BehaviorSubject<ConnectionPageItem[]>([])

  showBlocked = false
  isEmpty = true

  constructor(
    private connectionService: ConnectionService,
    private usersService: UserService,
    private configService: ConfigService,
    private profileService: ProfileService
  ) {
    addIcons({closeCircleOutline, closeCircle})
  }

  async ngOnInit() {
    await this.getConnections()
    this.getProfileInfos()
  }

  goToProfile(user_id: number|null, is_blocked: boolean|null) {
    if (!is_blocked) window.location.href = '/profile/' + user_id
  }

  async getConnections() {
    if (this.showBlocked) {
      (await this.connectionService.getBlockedConnectionsOfCurrentUser())
        .pipe(
          catchError(async (error) => {
            this.configService.handleError(error, "Connection Info Access Error")
            throw error
          })
        )
        .subscribe((data) => {
          this.connections.next(data as ConnectionInfo[])
        })
    } else {
      (await this.connectionService.getAllConnectionsOfCurrentUser())
        .pipe(
          catchError(async (error) => {
            this.configService.handleError(error, "Connection Info Access Error")
            throw error
          })
        )
        .subscribe((data) => {
          this.connections.next(data as ConnectionInfo[])
        })
    }
  }

  getProfileInfos() {
    this.connections.subscribe(async (connections) => {
      this.isEmpty = connections.length === 0
      this.connectionItems.next([])
      for (let connection of connections) {
        (await this.profileService.getProfileInfo(connection.connected_user_id))
          .pipe(
            catchError(async (error) => {
              this.configService.handleError(error, "Profile Info Access Error")
              throw error
            })
          )
          .subscribe((data) => {
            const profileInfos = data as ProfileInfo
            const connectionItem = {
              id: profileInfos.id,
              user_id: profileInfos.user_id,
              email: profileInfos.email,
              first_name: profileInfos.first_name,
              last_name: profileInfos.last_name,
              is_admin: profileInfos.is_admin,
              accepted_at: connection.accepted_at,
              is_blocked: connection.is_blocked,
            }
            this.connectionItems.next([...this.connectionItems.value, connectionItem])
          })
      }
    });
  }

  async blockUnblockConnection(connected_user_id: number|null, is_blocked: boolean|null) {
    if (is_blocked) {
      (await this.connectionService.unblockConnection(connected_user_id))
        .pipe(
          catchError(async (error) => {
            this.configService.handleError(error, "Connection Access Error")
            throw error
          })
        )
        .subscribe(async () => {
          await this.getConnections()
        })
    } else {
      (await this.connectionService.blockConnection(connected_user_id))
        .pipe(
          catchError(async (error) => {
            this.configService.handleError(error, "Connection Access Error")
            throw error
          })
        )
        .subscribe(async () => {
          await this.getConnections()
        })
    }

  }

  async onClickShowBlocked() {
    this.showBlocked = !this.showBlocked
    await this.getConnections()
  }
}
