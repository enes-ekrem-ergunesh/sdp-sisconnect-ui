import {AfterViewInit, Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {
  IonButton,
  IonCheckbox,
  IonContent,
  IonIcon,
  IonInput,
  IonItem,
  IonList,
  IonPopover, ViewDidEnter
} from "@ionic/angular/standalone";
import {addIcons} from "ionicons";
import {eye, eyeOff} from "ionicons/icons";
import {AuthService} from "../../../services/auth/auth.service";
import {PlatformService} from "../../../services/platform/platform.service";
import {NgIf} from "@angular/common";
import {SocialLogin} from "@capgo/capacitor-social-login";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  imports: [
    IonList,
    IonItem,
    IonInput,
    ReactiveFormsModule,
    IonButton,
    IonIcon,
    NgIf,
    IonCheckbox,
    IonPopover,
    IonContent
  ],
  standalone: true
})
export class LoginFormComponent {
  @ViewChild('popover') popover: any;
  @Output() loginFormEmitter = new EventEmitter<FormGroup>();

  isPopoverOpen = false;
  passwordInputType = 'password';
  showHidePasswordIcon = 'eye';

  emailValidators = [
    Validators.required,
    Validators.email,
    Validators.pattern(/^[a-zA-Z0-9._%+-]+@sis\.edu\.eg$/)
  ]

  loginForm = new FormGroup({
    email: new FormControl('eergunes@sis.edu.eg', this.emailValidators),
    password: new FormControl('DevTest123', Validators.required),
    remember_me: new FormControl(false)
  })

  constructor(
    private authService: AuthService,
    private platformService: PlatformService
  ) {
    addIcons({eye, eyeOff})
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      if (!this.isIonic())
        this.bootstrapFormShowValidation()
      return
    }
    this.loginFormEmitter.emit(this.loginForm)
  }

  get_error(control_name: string) {
    return this.authService.getFormValidationError(control_name, this.loginForm)
  }

  presentPopover(e: Event) {
    if (this.loginForm.valid) {
      return
    }
    this.popover.event = e;
    this.isPopoverOpen = true;
  }

  showHidePassword() {
    this.passwordInputType = this.passwordInputType === 'password' ? 'text' : 'password';
    this.showHidePasswordIcon = this.showHidePasswordIcon === 'eye' ? 'eye-off' : 'eye';
  }

  showHidePasswordButtonStyle() {
    // let element = document.getElementById('show-hide-password-button')
    let element = document.getElementsByClassName('show-hide-password-button')[0] as HTMLElement
    if (element) {
      setTimeout(() => {
        element.style['display'] = this.loginForm.get('password')?.value ? 'block' : 'none'
        element.style['marginBottom'] = this.authService.isPasswordErrorDisplayed() ? '19px' : '0'
      }, 20)
    }

    return "display: " + (this.loginForm.get('password')?.value ? 'block' : 'none') +
      "; margin-bottom: " + (this.authService.isPasswordErrorDisplayed() ? '15px' : '0')
  }

  bootstrapFormShowValidation() {
    // add `was-validated` class to the form
    const bsForm = document.getElementById('bs-login-form')
    bsForm?.classList.add('was-validated')

    // add a gap on the right of the show-hide-password button
    let element = document.getElementsByClassName('show-hide-password-button')[0] as HTMLElement
    const cssObj = window.getComputedStyle(element, null);
    const right = cssObj.getPropertyValue('right')
    element.style['right'] = (parseInt(right) + 17) + 'px'
  }

  async onGoogleLogin() {
    await SocialLogin.initialize({
      google: {
        webClientId: '79123379615-32p4ij8740n13t2bu00nbn7jpcg86101.apps.googleusercontent.com',
      },
    });
    const res = await SocialLogin.login({
      provider: 'google',
      options: {
        scopes: ['email', 'profile'],
      },
    });
    console.log(res)
  }

  isIonic() {
    return this.platformService.isMobile()
  }

}
