import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
@Output() componentSelected = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
    console.log("ngOnInit Inside HeaderComponent.ts");
  }
onSelect(component:string){
this.componentSelected.emit(component);
}
}