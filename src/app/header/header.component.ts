import { RecipeService } from './../recipe-book/recipe.service';
import { DatastorageService } from './../shared/datastorage.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private dataStorageService : DatastorageService, private recipeService : RecipeService) { }

  ngOnInit(): void {
    console.log("ngOnInit Inside HeaderComponent.ts");
  }

  onSaveData(){
this.dataStorageService.storeRecipes();
  }

  onFetchData(){
    this.dataStorageService.fetchRecipes().subscribe();
  }
}
