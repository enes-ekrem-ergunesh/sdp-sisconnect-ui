import {AfterViewInit, Component, ElementRef, OnInit, Renderer2} from '@angular/core';
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
    private router: Router,
    private renderer: Renderer2,
    private el: ElementRef
  ) {
  }

  ngOnInit() {

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

  googleWebLogin(response: any) {
    console.log("Google Login Content:", response)
    this.googleLogin(response.credential)
  }

  googleLogin(token:string){
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
        this.router.navigate(['/']).then()
      })
  }


}
