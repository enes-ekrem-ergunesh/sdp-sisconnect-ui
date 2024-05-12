import {Component, Input, OnInit} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Post} from "../../../../../../interfaces/sis-connect/post/post";
import {PostService} from "../../../../../../services/sis-connect/post/post.service";
import {AlertService} from "../../../../../../services/common/alert/alert.service";
import {UserService} from "../../../../../../services/sis-connect/user/user.service";
import {User} from "../../../../../../interfaces/sis-connect/user/user";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  @Input() page!: string;
  user: User = {
    address: '',
    birthdate: '',
    email: '',
    family_name: '',
    first_name: '',
    gender: '',
    id: 0,
    is_admin: false,
    table: '',
  }
  posts!: BehaviorSubject<Post[]>
  postTextArea: string = ""

  constructor(
    private postService: PostService,
    private userService: UserService,
    private alertService: AlertService
  ) {
  }

  ngOnInit() {
    if (this.page === 'profile') {
      this.getPostsByUser().then()
      this.getUser().then()
    } else if (this.page === 'home') {
      this.getConnectionsPosts().then()
    }
  }

  async getUser() {
    (await this.userService.getUserById()).subscribe((user) => {
      this.user = user;
    });
  }

  async getPostsByUser() {
    console.log("DEBUGGGGG");
    (await this.postService.get_posts_by_user_id()).subscribe(posts => {
      this.posts = new BehaviorSubject<Post[]>(posts)
      console.log("posts", posts)
    })
  }

  async getConnectionsPosts() {
    (await this.postService.get_all_posts_of_connections()).subscribe(posts => {
      this.posts = new BehaviorSubject<Post[]>(posts)
      console.log("posts", posts)
    })
  }

  async createPost() {
    if (this.postTextArea) {
      (await this.postService.create_post(this.postTextArea)).subscribe(m => {
        this.getPostsByUser().then()
        this.postTextArea = ""
        this.alertService.createAlert(200, m.message)
      })
    }
  }


}
