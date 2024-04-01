import {Component, OnInit} from '@angular/core';
import {HelloWorldService} from "../../../services/sis-connect/hello-world/hello-world.service";
import {UserService} from "../../../services/sis-connect/user/user.service";
import { Storage } from '@ionic/storage-angular';
import {Router} from "@angular/router"
import {AlertService} from "../../../services/common/alert/alert.service";
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  message: string = "";

  constructor(private helloWorldService: HelloWorldService,
              private userService: UserService,
              private storage: Storage,
              private router: Router,
              private alertService: AlertService
  ) {}

  async ngOnInit() {
    // Check the ionic storage for a token
    await this.storage.create();
    const token = await this.storage.get('token');

    // If token is not found, redirect to login page
    if (token == null || token == '') {
      console.log('No token found!')
      await this.router.navigate(['login']);
    }
  }

  greet() {
    // this.helloWorldService.getHelloWorld().subscribe((response) => {
    //   this.message = response.message;
    // });
    this.userService.getUserHello().subscribe((response) => {
      this.message = response.message;
    });
  }

  error(version: number) {
    switch (version) {
      case 1:
        this.alertService.createAlert(404, 'This is an error message 1');
        break;
      case 2:
        this.alertService.createAlert(500, 'This is an error message 2');
        break;
    }
  }
}
