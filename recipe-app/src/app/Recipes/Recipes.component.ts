import { Component } from '@angular/core';
import { Recipe } from './Recipes.model';
@Component({
  selector: "app-recipes",
  templateUrl: './Recipes.component.html',
  styleUrls: ['./Recipes.component.css']
})
export class RecipesComponent{
  name: string = 'Recipes';
  selectedRecipe: Recipe;
}
