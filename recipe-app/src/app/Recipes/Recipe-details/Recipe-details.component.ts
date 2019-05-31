import { Component, Input } from '@angular/core';
import { Recipe } from '../Recipes.model'
@Component({
  selector: "app-recipe-details",
  templateUrl: './Recipe-details.component.html',
  styleUrls: ['./Recipe-details.component.css']
})
export class RecipeDetailsComponent{
  @Input() recipe: Recipe;
  name: string = 'RecipeDetails';
}
