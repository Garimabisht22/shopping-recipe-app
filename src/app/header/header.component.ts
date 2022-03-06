import { Subscription } from 'rxjs';
import { AuthService } from './../auth/auth.service';
import { RecipeService } from './../recipe-book/recipe.service';
import { DatastorageService } from './../shared/datastorage.service';
import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSubs!: Subscription;
  isAuthenticated = false;
  constructor(
    private dataStorageService : DatastorageService,
     private recipeService : RecipeService,
     private authService : AuthService) { }

  ngOnDestroy(): void {
    this.userSubs.unsubscribe();
  }

  ngOnInit(): void {
    console.log("ngOnInit Inside HeaderComponent.ts");
    this.userSubs= this.authService.user.subscribe(user=>{
      this.isAuthenticated = !!user;
    });
  }

  onSaveData(){
this.dataStorageService.storeRecipes();
  }

  onFetchData(){
    this.dataStorageService.fetchRecipes().subscribe();
  }
  onLogout(){
    this.authService.logout();
  }
}
