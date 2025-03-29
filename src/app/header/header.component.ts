import { Component, inject, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [ButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  currentUser = this.authService.currentUser;

  ngOnInit(): void {
      const token = localStorage.getItem("access_token");
      this.authService.decodeToken(token!);
  }

  logout() {
    if (!confirm('Voulez-vous vous déconnectez ?')) return;
    this.authService.logout();
    this.router.navigate(['/auth']);
  }
}
