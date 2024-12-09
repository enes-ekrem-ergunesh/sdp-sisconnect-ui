import {Component, OnInit} from '@angular/core';
import {LoginFormComponent} from "../../forms/login-form/login-form.component";
import {LoginForm} from "../../../interfaces/login-form";
import {FormGroup} from "@angular/forms";
import {LoginFormValue} from "../../../interfaces/login-form-value";
import {AuthService} from "../../../services/auth/auth.service";
import {StorageService} from "../../../services/storage/storage.service";
import {TokenInfo} from "../../../interfaces/token-info";
import {catchError} from "rxjs";
import {ConfigService} from "../../../services/config/config.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-content',
  templateUrl: './login-content.component.html',
  styleUrls: ['./login-content.component.scss'],
  imports: [
    LoginFormComponent
  ],
  standalone: true
})
export class LoginContentComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private configService: ConfigService,
    private router: Router
  ) {
  }

  ngOnInit() {
    return
  }

  emailPasswordLogin(loginForm: FormGroup<LoginForm>) {
    const loginFormValue: LoginFormValue = {
      email: loginForm.value.email as string,
      password: loginForm.value.password as string,
      remember_me: loginForm.value.remember_me as boolean
    }
    console.log(loginFormValue)

    this.authService.emailPasswordLogin(loginFormValue)
      .pipe(
        catchError(async (error) => {
          this.configService.handleError(error, "Login Error")
          throw error
        })
      )
      .subscribe(response => {
        const res = response as TokenInfo
        console.log(res.token)
        this.storageService.set('token', res.token)
        this.router.navigate(['/']).then()
      })

  }

}
