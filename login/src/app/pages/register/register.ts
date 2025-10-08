import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  message = '';

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  register() {
    if (this.registerForm.invalid) {
      this.message = 'Please fill all fields correctly';
      return;
    }

    const { name, email, password } = this.registerForm.value;

    this.authService.register(name, email, password).subscribe({
      next: res => {
        this.message = res.message;
        if(res.token) this.authService.setToken(res.token);
      },
      error: err => {
        if (err.status === 400 && err.error.message === 'User already exists') {
          this.message = 'Email already registered. Please login.';
        } else {
          this.message = err.error.message || 'Server error';
        }
      }
    });
  }
}
