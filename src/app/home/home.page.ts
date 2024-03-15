import {Component, OnInit} from '@angular/core';
import {HelloWorldService} from "../services/sis-connect/hello-world/hello-world.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  message: string = "";

  constructor(private helloWorldService: HelloWorldService) {}

  ngOnInit(): void {
    this.helloWorldService.getHelloWorld().subscribe((response) => {
      this.message = response.message;
    });
  }



}
