import {Component, OnInit} from '@angular/core';
import {HelloWorldService} from "../../../services/sis-connect/hello-world/hello-world.service";
import {UserService} from "../../../services/sis-connect/user/user.service";
import { Storage } from '@ionic/storage-angular';
import {Router} from "@angular/router"

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
  ) {}

  async ngOnInit() {
    await this.storage.create();
    const token = await this.storage.get('token');
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

  logout() {
    this.userService.logout().then(async () => {
      await this.storage.remove('token');
      await this.router.navigate(['login']);
    });
  }
}
