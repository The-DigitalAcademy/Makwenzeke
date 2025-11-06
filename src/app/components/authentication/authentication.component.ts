import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder){
    this.initialiseForms();
  }

  initialiseForms() {

    this.signinForm = this.fb.group({
      email: ['', [Validators.email]],
      password: ['', [Validators.minLength(4), Validators.maxLength(15)]]
    });

    this.signupForm = this.fb.group({
      displayName: ['', [Validators.minLength(4), Validators.maxLength(15)]],
      email: ['', [Validators.email]],
      password: ['', [Validators.minLength(4), Validators.maxLength(15)]]
    });
    
  }

  signin() {
    if(!this.signinForm.valid) return; 
    // Form is valid, destructure and pass emaill and password into our login method.
    const { email, password } = this.signinForm.value;
    this.authService.login(email, password).subscribe({
      next: (resp) => {
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        alert('Error signin into your account.');
      }
    })
  }

  signup() {
    if(!this.signupForm.valid) return;
    // Form is valid, destructure form and pass displayName, emaill and password into our register/signup method.
    const { displayName, email, password } = this.signupForm.value;
    this.authService.register(displayName, email, password).subscribe({
      next: (resp) => {
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        // Error signinup, display alert or toaster to user
        alert('Error creating account.');
      }
    })
  }

  isSigninForm() : boolean {
    return this.isSignin;
  }

  changeForm(formType: string = 'signin') {
    formType === 'signin' ? this.isSignin = true : this.isSignin = false;
  }

}
