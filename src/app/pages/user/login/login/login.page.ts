import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgOptimizedImage} from "@angular/common";
import {UserService} from "../../../../services/sis-connect/user/user.service";
import {Token} from "../../../../interfaces/sis-connect/user/token";
import { Storage } from '@ionic/storage-angular';
import {Router} from "@angular/router"

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [ReactiveFormsModule, NgOptimizedImage]
})
export class LoginPage implements OnInit{
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

  constructor(
    private userService: UserService,
    private storage: Storage,
    private router: Router,
  ) {
  }

  async ngOnInit() {
    await this.storage.create();
  }

  onSubmit() {
    this.userService.login(this.loginForm.value).subscribe(async (token: Token) => {
      console.log(token);
      await this.storage.set('token', token.token);
      await this.router.navigate(['home']);
    })
  }

}
