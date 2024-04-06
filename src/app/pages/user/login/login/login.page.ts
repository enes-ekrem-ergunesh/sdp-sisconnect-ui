import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgOptimizedImage} from "@angular/common";
import {UserService} from "../../../../services/sis-connect/user/user.service";
import {AlertModule} from "../../../../modules/common/alert/alert/alert.module";

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [ReactiveFormsModule, NgOptimizedImage, AlertModule]
})
export class LoginPage implements OnInit {

  url = ''
  loginForm = new FormGroup({
    email: new FormControl(
      '2312enes@sis.edu.eg',
      [
        Validators.required,
        Validators.email
      ]
    ),
    password: new FormControl(
      'ewq123',
      [
        Validators.required,
      ]
    ),
    rememberMe: new FormControl(false, Validators.required),
  })

  constructor(
    private userService: UserService,
  ) {  }

  async ngOnInit() {
    this.url = window.location.href;
  }

  onSubmit() {
    this.userService.login(this.loginForm.value)
  }

}
