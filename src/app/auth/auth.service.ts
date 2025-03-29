import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { apiUrl } from '../../constant';
import { catchError, firstValueFrom, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private httpClient = inject(HttpClient);
  isLogged = signal(false);

  signIn(email: string, password: string) {
    const request = this.httpClient.post<{access_token: string}>(`${apiUrl}/auth/signin`, {email, password}).pipe(
      retry(3), catchError((err) => throwError(() => new Error(err.message, err)))
    );
    return firstValueFrom(request);
  }

  signUp(email: string, password: string) {
    const request = this.httpClient.post<{access_token: string}>(`${apiUrl}/auth/signup`, {email, password}).pipe(
      retry(3), catchError((err) => throwError(() => new Error(err.message, err)))
    );
    return firstValueFrom(request);
  }

  isLoggedIn() {
    const v = !!localStorage.getItem('access_token');
    this.isLogged.set(v)
    return v;
  }

  decodeToken(token: string) {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  }

  logout() {
    localStorage.removeItem('access_token');
    this.isLogged.set(false);
  }
}
