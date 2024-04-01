import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AlertComponent} from "../../../../components/common/alert/alert/alert.component";


@NgModule({
  declarations: [AlertComponent],
  exports: [AlertComponent],
  imports: [CommonModule]
})
export class AlertModule {
}
