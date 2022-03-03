import { tap } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from './user.model';

export interface AuthResponseData{
  kind : string;
  idToken : string;
  email : string;
  refreshToken : string;
  localId : string;
  expiresIn : string;
  registered?:boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new Subject<User>();

  constructor(private http: HttpClient) {}

  signUp(email: string, password: string) {
   return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBafrUUVjHTJqqQ-xO6JJbwarjKUsYKOX8',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      ).pipe(tap(resData=>{
       
      }))
      
  }
  logIn(email:string, password : string){
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBafrUUVjHTJqqQ-xO6JJbwarjKUsYKOX8',{
      email :email,
      password:password,
      returnSecureToken: true,
    })
  }
  private handleAuthentication(email:string,userId:string,token:string,expiresIn : number){
    const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000 );

    const user = new User(email,userId,token,expirationDate);
    this.user.next(user);
  }

}