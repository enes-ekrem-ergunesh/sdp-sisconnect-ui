import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {IonSearchbar} from "@ionic/angular";

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit, AfterViewInit {
  @ViewChild('ionSearchbar') searchBar!: IonSearchbar;

  constructor() { }

  ngOnInit() {
    return
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.searchBar?.setFocus(); // Use optional chaining here
    }, 100);
  }

}
