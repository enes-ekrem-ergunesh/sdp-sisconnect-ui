import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TimelineTabComponent} from "../../../../components/profile/profile-tabs/timeline-tab/timeline-tab/timeline-tab.component";
import {PostComponent} from "../../../../components/profile/profile-tabs/timeline-tab/post/post/post.component";
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [TimelineTabComponent, PostComponent],
    exports: [TimelineTabComponent, PostComponent],
    imports: [
        CommonModule,
        FormsModule
    ]
})
export class TimelineTabModule { }
