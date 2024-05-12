import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-tabs',
  templateUrl: './profile-tabs.component.html',
  styleUrls: ['./profile-tabs.component.scss'],
})
export class ProfileTabsComponent  implements OnInit {
  activeTab = 'timeline'

  constructor() { }

  ngOnInit() {
    return
  }

  tabStatus(tab: string) {
    if (this.activeTab === tab) {
      return 'active'
    }
    return ''
  }

  changeTab(tab: string) {
    this.activeTab = tab
  }
}
