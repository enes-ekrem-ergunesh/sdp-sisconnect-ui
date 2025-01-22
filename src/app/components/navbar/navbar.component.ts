import {Component, Input, OnInit} from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [
    RouterLinkActive,
    RouterLink,
    NgOptimizedImage
  ],
  standalone: true
})
export class NavbarComponent  implements OnInit {
  @Input() currentPage = 'home';

  profileImage = 'assets/profile-image-placeholder.jpg';

  constructor() { }

  ngOnInit() {
    return
  }

}
