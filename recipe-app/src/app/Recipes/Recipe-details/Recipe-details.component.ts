import { ActivatedRouteSnapshot, ActivatedRoute, Params } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../Recipes.model'
import { RecipesSercive } from '../Recipes.service';
@Component({
  selector: "app-recipe-details",
  templateUrl: './Recipe-details.component.html',
  styleUrls: ['./Recipe-details.component.css'],
})
export class RecipeDetailsComponent implements OnInit{
  recipe: Recipe;

  constructor(private recipesService: RecipesSercive, private activeRoute: ActivatedRoute){}

  ngOnInit(){
    let idx = this.activeRoute.snapshot.params['idx'];
    this.recipe = this.recipesService.getRecipe(idx);

    this.activeRoute.params.subscribe(
      (params: Params)=>{
        idx = params['idx'];
        this.recipe = this.recipesService.getRecipe(idx);
      }
    )

  }

  toShoppingList(){
    this.recipesService.sendIngredients(this.recipe.ingredients);
  }
}
