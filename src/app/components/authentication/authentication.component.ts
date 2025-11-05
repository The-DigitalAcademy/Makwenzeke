import { Component, signal } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent {
  isSignin : boolean = true;
  signinForm!: FormGroup;
  signupForm!: FormGroup;

  constructor(private authService: AuthService){

  }

  signin() {
    // this.authService.login()
  }

  signup() {
    // this.authService.register()
  }

  isSigninForm() : boolean {
    return this.isSignin;
  }

  changeForm(formType: string = 'signin') {
    formType === 'signin' ? this.isSignin = true : this.isSignin = false;
  }

}
