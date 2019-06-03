import { Component, OnInit } from '@angular/core';
import { Recipe } from './Recipes.model';
import { RecipesSercive } from './Recipes.service';
@Component({
  selector: "app-recipes",
  templateUrl: './Recipes.component.html',
  styleUrls: ['./Recipes.component.css']
})
export class RecipesComponent implements OnInit{
  recipeSelected: Recipe;

  constructor(private recipeService: RecipesSercive){}

  ngOnInit(){
    this.recipeService.selectedRecipe.subscribe(
      (recipe: Recipe) => {

        this.recipeSelected = recipe;
      }
    )
  }
}
