import { Router } from '@angular/router';
import { User } from './user.model';
import { AuthService, AuthResponseData } from './auth.service';
import { NgForm } from '@angular/forms';
import { Component } from '@angular/core';
import { Observable, Subject } from 'rxjs';
// enum mode {
//   loginMode,
//   signUpMode,
// }

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent {

  //   currentMode: mode = mode.loginMode;
  // ngForm!: FormsModule;



  constructor(private authService: AuthService,private router : Router) {}
  isLoginMode = true;
  isLoading = false;
  error: any = null;
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  onSubmit(form: NgForm) {
    this.isLoading = true;
    this.error = null;
    let authObs: Observable<AuthResponseData>;
    if (!form.valid) {
      return;
    }
    if (this.isLoginMode) {
      authObs = this.authService.logIn(form.value.email, form.value.password);
    } else {
      authObs = this.authService.signUp(form.value.email, form.value.password);
    }
    authObs.subscribe({
      complete: () => {
        this.error = null;
        console.log();
        this.isLoading = false;
        this.router.navigate(['./recipes']);
      },
      error: (err) => {
        this.isLoading = false;
        if (err.error.error) this.error = err.error.error.message;
        else this.error = 'Unknown Error';
      },
    });
    form.reset();
  }
  // private handleError(errorRes:HttpErrorResponse){
  // let errorMessage = 'An unknown error occurred';
  // if(!errorMessage || !errorRes.error.error){
  //   return throwError(()=>{
  //     new Error()
  //   });
  // }

  // }
}
