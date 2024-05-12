import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavbarComponent} from "../../../../components/common/navbar/navbar/navbar.component";
import {ProfileDropdownModule} from "../profile-dropdown/profile-dropdown/profile-dropdown.module";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {SearchModule} from "../search/search.module";
import {NotificationsModule} from "../notifications/notifications/notifications.module";



@NgModule({
  declarations: [NavbarComponent],
  exports: [NavbarComponent],
    imports: [
        CommonModule,
        ProfileDropdownModule,
        RouterLink,
        RouterLinkActive,
        SearchModule,
        NotificationsModule
    ]
})
export class NavbarModule { }
