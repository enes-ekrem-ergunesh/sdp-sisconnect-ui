import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavbarComponent} from "../../../../components/common/navbar/navbar/navbar.component";
import {ProfileDropdownModule} from "../profile-dropdown/profile-dropdown/profile-dropdown.module";



@NgModule({
  declarations: [NavbarComponent],
  exports: [NavbarComponent],
  imports: [
    CommonModule,
    ProfileDropdownModule
  ]
})
export class NavbarModule { }
