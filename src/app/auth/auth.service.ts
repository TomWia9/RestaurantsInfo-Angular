import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthResponse } from './authResponse';
import { User } from './user.model';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  user = new BehaviorSubject<User>(null);

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>('https://localhost:5001/api/auth/signin', {
        email,
        password
      })
      .pipe(
        tap((resData) => {
          if (resData.token) {
            this.handleAuthentication(resData.token);
          }
        })
      );
  }

  private handleAuthentication(token: string): void {
    console.log(token);
  }
}
