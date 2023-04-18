import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  constructor(private router: Router, private authService: AuthService) {}

  onLogin(): void {
    this.authService
      .login('pablosadura@mail.com', '12345')
      .subscribe((user) => {
        this.router.navigate(['/']);
      });
  }
}
