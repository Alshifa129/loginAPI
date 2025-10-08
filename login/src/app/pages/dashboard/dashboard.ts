import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {
  userEmail: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (!token) {

      this.router.navigate(['/login']);
    } else {

      this.userEmail = 'User';
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
