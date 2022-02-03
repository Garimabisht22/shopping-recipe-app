import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css']
})
export class EditRecipeComponent implements OnInit {

  constructor(private router:ActivatedRoute) { }
  id!:number;
  editMode = false;
  ngOnInit(): void {
    this.router.params.subscribe((res)=>{
      this.id = +res['id'];
      this.editMode= res['id'] != null ;
    })
  }

}
