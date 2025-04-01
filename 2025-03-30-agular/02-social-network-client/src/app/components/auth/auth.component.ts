import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService, Signup } from '../../../services/auth.service';
import Login from '../../../models/Login.model';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  authForm: FormGroup;
  isSignup = false;
  error: string | null = null;

  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private router: Router) {
    this.authForm = this.fb.group({
      name: [''],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  toggleMode() {
    this.isSignup = !this.isSignup;
    if (!this.isSignup) {
      this.authForm.get('name')?.clearValidators();
    } else {
      this.authForm.get('name')?.setValidators(Validators.required);
    }
    this.authForm.get('name')?.updateValueAndValidity();
  }

  onSubmit() {
    if (this.authForm.invalid) return;
    if (this.isSignup) {
      const signupData: Signup = this.authForm.value;
      this.authService.signup(signupData).subscribe({
        next: (res) => {
          localStorage.setItem('auth_token', res.jwt);
          this.router.navigate(['/profile']);
        },
        error: err => this.error = err.message
      });
    } else {
      const loginData: Login = this.authForm.value;
      this.authService.login(loginData).subscribe({
        next: (res) => {
          localStorage.setItem('auth_token', res.jwt);
          this.router.navigate(['/profile']);
        },
        error: err => this.error = err.message
      });
    }
  }
}
