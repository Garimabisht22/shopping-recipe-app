import { AuthService } from './auth.service';
import { NgForm } from '@angular/forms';
import { Component } from '@angular/core';
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
constructor(private authService : AuthService){

}
  isLoginMode = true;
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  onSubmit(form: NgForm) {
    form.reset();
    this.authService.signUp(form.value('email'),form.value('password')).subscribe(res=>{
      
    },);
  }



}
