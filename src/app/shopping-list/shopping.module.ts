import { RouterModule } from '@angular/router';
import { SharedModule } from './../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from "@angular/core";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { ShoppingListComponent } from "./shopping-list.component";

@NgModule({
    declarations:[
        ShoppingListComponent,
        ShoppingEditComponent,
        
    ],
    imports:[
        ReactiveFormsModule,
        SharedModule,
        RouterModule.forChild([
         { path: '', component: ShoppingListComponent },

        ])
    ],

})

export class ShoppingModule{

}