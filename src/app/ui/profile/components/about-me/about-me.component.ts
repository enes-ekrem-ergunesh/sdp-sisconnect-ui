import { Component, OnInit } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {AboutMeService} from "../../services/about-me/about-me.service";

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss'],
})
export class AboutMeComponent  implements OnInit {
  isModalOpen!: BehaviorSubject<boolean>;

  constructor(
    private aboutMeService: AboutMeService
  ) {
    this.isModalOpen = this.aboutMeService.getEditModalOpen();
  }

  ngOnInit() {}

  setOpen(isOpen: boolean) {
    this.aboutMeService.setEditModalOpen(isOpen);
  }
}
