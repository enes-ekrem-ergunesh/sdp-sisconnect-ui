import {Component, OnInit} from '@angular/core';
import {HelloWorldService} from "../services/sis-connect/hello-world/hello-world.service";
import {UserService} from "../services/sis-connect/user/user.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  message: string = "";

  constructor(private helloWorldService: HelloWorldService, private userService: UserService) {}

  ngOnInit(): void {
    // this.helloWorldService.getHelloWorld().subscribe((response) => {
    //   this.message = response.message;
    // });
    this.userService.getUserHello().subscribe((response) => {
      this.message = response.message;
    });
  }
}
