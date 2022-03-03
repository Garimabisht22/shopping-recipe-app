import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private http: HttpClient) {}

  signUp(email: string, password: string) {
   return this.http
      .post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=AIzaSyBafrUUVjHTJqqQ-xO6JJbwarjKUsYKOX8',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      
  }
}
