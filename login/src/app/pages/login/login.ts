// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { RouterModule } from '@angular/router';
// import { AuthService } from '../../auth';

// @Component({
//   selector: 'app-login',
//   standalone: true,
//   imports: [CommonModule, ReactiveFormsModule, RouterModule],
//   templateUrl: './login.html',
//   styleUrls: ['./login.css']
// })
// export class LoginComponent {
//   loginForm: FormGroup;
//   message = '';

//   constructor(private fb: FormBuilder, private authService: AuthService) {
//     this.loginForm = this.fb.group({
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', Validators.required]
//     });
//   }

//   login() {
//     if(this.loginForm.invalid) {
//       this.message = 'Please fill all fields correctly';
//       return;
//     }

//     const { email, password } = this.loginForm.value;

//     this.authService.login(email, password).subscribe({
//       next: res => {
//         this.message = res.message;
//         if(res.token) this.authService.setToken(res.token);
//       },
//       error: err => {
//         if(err.status === 400 && err.error.message === 'User not found') {
//           this.message = 'Email not registered. Please register first.';
//         } else if(err.status === 400 && err.error.message === 'Invalid password') {
//           this.message = 'Incorrect password';
//         } else {
//           this.message = err.error.message || 'Server error';
//         }
//       }
//     });
//   }
// }
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router'; // <-- import Router
import { AuthService } from '../../auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  message = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { // <-- inject Router
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login() {
    if(this.loginForm.invalid) {
      this.message = 'Please fill all fields correctly';
      return;
    }

    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: res => {
        this.message = res.message;

        if(res.token) {
          // ✅ Keep existing functionality
          this.authService.setToken(res.token);

          // ✅ Add dashboard redirect
          this.router.navigate(['/dashboard']);
        }
      },
      error: err => {
        if(err.status === 400 && err.error.message === 'User not found') {
          this.message = 'Email not registered. Please register first.';
        } else if(err.status === 400 && err.error.message === 'Invalid password') {
          this.message = 'Incorrect password';
        } else {
          this.message = err.error.message || 'Server error';
        }
      }
    });
  }
}
