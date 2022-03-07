import { PlaceholderDirective } from './../shared/placeholder/placeholder.directive';
import { AlertComponent } from './../shared/alert/alert.component';
import { Router } from '@angular/router';
import { AuthService, AuthResponseData } from './auth.service';
import { NgForm } from '@angular/forms';
import {
  Component,
  ComponentFactoryResolver,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
// enum mode {
//   loginMode,
//   signUpMode,
// }

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnDestroy {
  //   currentMode: mode = mode.loginMode;
  // ngForm!: FormsModule;

  constructor(
    private authService: AuthService,
    private router: Router,
    private companyFactoryResolver: ComponentFactoryResolver
  ) {}
  ngOnDestroy(): void {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }
  isLoginMode = true;
  isLoading = false;
  error: any = null;
  private closeSub!: Subscription;
  @ViewChild(PlaceholderDirective, {
    static: false,
  })
  alertHost!: PlaceholderDirective;
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
        this.showErrorAlert(err.error.error.message);
        if (err.error.error) this.error = err.error.error.message;
        else this.error = 'Unknown Error';
      },
    });
    form.reset();
  }
  onHandleError() {
    this.error = null;
  }
  private showErrorAlert(error: string) {
    // const alertCmp = new AlertComponent();
    //  const alertCmpFactory =  this.companyFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(AlertComponent);
    componentRef.instance.message = error;
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
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
