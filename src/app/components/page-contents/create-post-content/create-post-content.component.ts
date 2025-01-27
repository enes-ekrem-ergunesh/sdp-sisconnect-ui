import { Component, OnInit } from '@angular/core';
import {IonButton, IonTextarea} from "@ionic/angular/standalone";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {Location} from "@angular/common";
import {PostService} from "../../../services/post/post.service";

@Component({
  selector: 'app-create-post-content',
  templateUrl: './create-post-content.component.html',
  styleUrls: ['./create-post-content.component.scss'],
  imports: [
    IonTextarea,
    IonButton,
    ReactiveFormsModule
  ],
  standalone: true
})
export class CreatePostContentComponent  implements OnInit {
  postContent = new FormControl('');

  constructor(
    private _location: Location,
    private postService: PostService
  ) { }

  ngOnInit() {
    return
  }

  async createPost() {
    console.log(this.postContent.value);
    (await this.postService.createPost(this.postContent.value))
      .pipe()
      .subscribe(()=> {
        this._location.back();
      })
  }

}
