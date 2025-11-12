import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import  * as authActions  from '../../store/actions/auth.actions';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent {
  isSignin : boolean = true;
  signinForm!: FormGroup;
  signupForm!: FormGroup;

  constructor(private fb: FormBuilder, private store: Store){
    this.initialiseForms();
  }

  initialiseForms() {

    this.signinForm = this.fb.group({
      email: ['', [Validators.email]],
      password: ['', [Validators.minLength(4), Validators.maxLength(15)]]
    });

    this.signupForm = this.fb.group({
      name: ['', [Validators.minLength(4), Validators.maxLength(15)]],
      email: ['', [Validators.email]],
      password: ['', [Validators.minLength(4), Validators.maxLength(15)]]
    });
    
  }

  signin() {
    if(!this.signinForm.valid) return; 
    // Form is valid, destructure and pass emaill and password into our login method.
    const { email, password } = this.signinForm.value;
    this.store.dispatch(authActions.login({email, password}));
  }

  signup() {
    if(!this.signupForm.valid) return;
    // Form is valid, destructure form and pass displayName, emaill and password into our register/signup method.
    const { name, email, password } = this.signupForm.value;
    this.store.dispatch(authActions.signup({name, email, password}));
  }

  isSigninForm() : boolean {
    return this.isSignin;
  }

  changeForm(formType: string = 'signin') {
    formType === 'signin' ? this.isSignin = true : this.isSignin = false;
  }

}
