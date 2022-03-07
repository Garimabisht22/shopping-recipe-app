import { LoggingService } from './logging.service';
import { AuthService } from './auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'project';
// loadedFeature:string='recipe';
constructor(private authService:AuthService,private loggingService:LoggingService){

}
ngOnInit(){
this.authService.autoLogin();
  console.log("ngOnInit Inside AppComponent.ts");
this.loggingService.printLog("Hello from AppComponent ngOnInit")
}

}
