import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../Recipes.model'
import { RecipesSercive } from '../Recipes.service';
@Component({
  selector: "app-recipe-details",
  templateUrl: './Recipe-details.component.html',
  styleUrls: ['./Recipe-details.component.css'],
})
export class RecipeDetailsComponent implements OnInit{
  @Input() recipe: Recipe;

  constructor(private recipesService: RecipesSercive){}

  ngOnInit(){
  }

  toShoppingList(){
    this.recipesService.sendIngredients(this.recipe.ingredients);
  }
}
