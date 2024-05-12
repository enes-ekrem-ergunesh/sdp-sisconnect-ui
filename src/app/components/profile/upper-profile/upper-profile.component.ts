import { Component, OnInit } from '@angular/core';
import {User} from "../../../interfaces/sis-connect/user/user";
import {UserService} from "../../../services/sis-connect/user/user.service";
import {BehaviorSubject} from "rxjs";
import {ProfileService} from "../../../services/sis-connect/profile/profile.service";
import {ConnectionService} from "../../../services/sis-connect/connection/connection.service";
import {AlertService} from "../../../services/common/alert/alert.service";
import {Connection} from "../../../interfaces/sis-connect/connection/connection";

@Component({
  selector: 'app-upper-profile',
  templateUrl: './upper-profile.component.html',
  styleUrls: ['./upper-profile.component.scss'],
})
export class UpperProfileComponent implements OnInit {
  user: User = {
    address: '',
    birthdate: '',
    email: '',
    family_name: '',
    first_name: '',
    gender: '',
    id: 0,
    is_admin: false,
    table: '',
  }
  owned = new BehaviorSubject(true);
  connection!: BehaviorSubject<Connection>;
  connectionStatus = new BehaviorSubject('disconnected')

  connectionStatusVisibility = 'hidden'

  constructor(
    private userService: UserService,
    private profileService: ProfileService,
    private connectionService: ConnectionService,
    private alertService: AlertService
  ) {
    this.owned = this.profileService.isProfileOwned()
  }

  async ngOnInit() {
    // console.log('UpperProfileComponent')
    await this.getUser();
    await this.getConnectionBetween()
    setTimeout(() => {
      this.connectionStatusVisibility = 'visible'
    }, 100)
  }

  async getUser() {
    (await this.userService.getUserById()).subscribe((user) => {
      this.user = user;
    });
  }

  async getConnectionBetween() {
    (await this.connectionService.get_connection_between_users()).subscribe(connection => {
      this.connection = new BehaviorSubject<Connection>(connection)
      if(!connection.id){
        this.connectionStatus.next('disconnected')
      }
      else if(!connection.accepted_at){
        this.connectionStatus.next('pending')
      }
      else{
        this.connectionStatus.next('connected')
      }
      console.log("this.connectionStatus.value", this.connectionStatus.value)
    })
  }

  async addConnection() {
    (await this.connectionService.create_connection()).subscribe(m => {
      this.alertService.createAlert(200, m.message)
      this.getConnectionBetween()
    })
  }

  protected readonly console = console;

  async removeConnection() {
    (await this.connectionService.delete_connection_between_users()).subscribe(m => {
      this.alertService.createAlert(200, m.message)
      this.getConnectionBetween()
    })
  }

  async cancelRequest() {
    (await this.connectionService.delete_connection(this.connection.value.id)).subscribe(m => {
      this.alertService.createAlert(200, m.message)
      this.getConnectionBetween()
    })
  }
}
