import { Component, OnInit } from "@angular/core";

@Component({
  selector: 'app-recipe-item',
  templateUrl: './Recipe-item.component.html',
  styleUrls: ['./Recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit{
  name: string = 'RecipeItem';

  ngOnInit(){

  }
}
