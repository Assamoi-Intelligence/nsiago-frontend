import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  authService = inject(AuthService);
  isLogged = this.authService.isLogged;

  constructor() {
  }
}
