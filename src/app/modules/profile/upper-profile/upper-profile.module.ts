import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {UpperProfileComponent} from "../../../components/profile/upper-profile/upper-profile.component";



@NgModule({
  declarations: [UpperProfileComponent],
  exports: [UpperProfileComponent],
  imports: [
    CommonModule,
    NgOptimizedImage
  ]
})
export class UpperProfileModule { }
