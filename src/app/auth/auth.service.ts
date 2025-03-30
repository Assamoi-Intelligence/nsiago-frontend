import { HttpClient } from '@angular/common/http';
import { inject, Injectable, model, signal } from '@angular/core';
import { apiUrl } from '../../constant';
import { catchError, firstValueFrom, retry, throwError } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private httpClient = inject(HttpClient);
  isLogged = signal(false);
  currentUser = signal<User | null>(null);

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

  logout() {
    localStorage.removeItem('access_token');
    this.isLogged.set(false);
  }

  decodeToken(token: string){
    try {
      // Découpage du token
      const [header, payload, signature] = token.split('.');
      // Décodage base64 de la partie payload
      const decodedPayload = JSON.parse(atob(payload));
      this.currentUser.set({email: decodedPayload.email, role: decodedPayload.role, id: decodedPayload.sub});
      return {
        header: JSON.parse(atob(header)),
        payload: decodedPayload,
        signature
      };
    } catch (e) {
      console.error('Invalid token format');
      return null;
    }
  }
}
