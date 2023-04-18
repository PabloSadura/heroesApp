import { Observable, of } from 'rxjs';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/auth/interfaces/auth.interface';
import { AuthService } from 'src/app/auth/services/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
    `
      .container {
        margin: 20px;
      }
    `,
  ],
})
export class HomeComponent {
  constructor(private router: Router, private authService: AuthService) {}

  get user(): User | undefined {
    return this.authService.currentUser;
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['./auth/login']);
  }
}
