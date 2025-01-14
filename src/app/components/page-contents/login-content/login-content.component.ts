import {AfterViewInit, Component, OnInit} from '@angular/core';
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
import {GoogleLoginPostValue} from "../../../interfaces/google-login-post-value";
import {PlatformService} from "../../../services/platform/platform.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-login-content',
  templateUrl: './login-content.component.html',
  styleUrls: ['./login-content.component.scss'],
  imports: [
    LoginFormComponent,
    NgIf
  ],
  standalone: true
})
export class LoginContentComponent implements AfterViewInit {

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private configService: ConfigService,
    private router: Router,
    private platformService: PlatformService
  ) {
  }

  async ngAfterViewInit() {
    if (this.isIonic() && !this.isMobileWeb()) {
      return
    }
    // @ts-ignore
    google.accounts.id.initialize({
      client_id: "79123379615-32p4ij8740n13t2bu00nbn7jpcg86101.apps.googleusercontent.com",
      callback: this.googleWebLogin.bind(this),
      auto_select: false,
      cancel_on_tap_outside: true,

    });
    // @ts-ignore
    google.accounts.id.renderButton(
      document.getElementById("google-button"),
      {
        type: "icon",
        theme: "filled_black",
        size: "large",
        shape: "pill",
        width: "100%"
      }
    );
    // @ts-ignore
    google.accounts.id.prompt((notification: PromptMomentNotification) => {
    });

    setTimeout(() => {
      this.centerMask()
    }, 10)
    setTimeout(() => {
      this.centerMask()
    }, 500)
    addEventListener("orientationchange", () => {
      setTimeout(() => {
        this.centerMask()
      }, 10)
    })
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
        this.router.navigate(['/'], {replaceUrl: true}).then()
      })

  }

  googleWebLogin(response: any) {
    console.log("Google Login Content:", response)
    this.googleLogin(response.credential)
  }

  googleLogin(token: string) {
    const googleLoginPostValue: GoogleLoginPostValue = {
      id_token: token
    }

    this.authService.googleLogin(googleLoginPostValue)
      .pipe(
        catchError(async (error) => {
          this.configService.handleError(error, "Google Login Error")
          throw error
        })
      )
      .subscribe(response => {
        const res = response as TokenInfo
        console.log(res.token)
        this.storageService.set('token', res.token)
        this.router.navigate(['/'], {replaceUrl: true}).then()
      })
  }

  isIonic() {
    return this.platformService.isMobile()
  }

  isMobileWeb() {
    return this.platformService.isMobileWeb()
  }

  centerMask() {
    const googleButton = document.getElementById("google-button")
    const ionMask = document.getElementById("ion-mask")
    const toolbarHeight = this.platformService.isIos() ? 44 : 56
    if (googleButton == null || ionMask == null) return
    ionMask.style.left = (googleButton.offsetLeft + googleButton.offsetWidth / 2)
      - (ionMask.offsetWidth / 2) + "px"
    ionMask.style.top = (toolbarHeight + googleButton.offsetTop + googleButton.offsetHeight / 2)
      - (ionMask.offsetHeight / 2) + "px"
  }

}
