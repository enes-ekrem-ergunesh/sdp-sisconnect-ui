import {Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgOptimizedImage} from "@angular/common";

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [ReactiveFormsModule, NgOptimizedImage]
})
export class LoginPage {
  loginForm = new FormGroup({
    email: new FormControl(
      '',
      [
        Validators.required,
        Validators.email
      ]
    ),
    password: new FormControl(
      '',
      [
        Validators.required,
      ]
    ),
    rememberMe: new FormControl(false, Validators.required),
  })

  constructor() {
  }

  onSubmit() {
    console.log(this.loginForm.value);
  }

}
