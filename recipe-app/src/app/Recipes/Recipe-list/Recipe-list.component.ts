import{ Component, OnInit } from '@angular/core';
import { Recipe } from '../Recipes.model';
import { RecipesSercive } from '../Recipes.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './Recipe-list.component.html',
  styleUrls:['./Recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  name : string = 'Recipe List';
  recipes: Recipe[];

  constructor(private recipeSercice: RecipesSercive) {

  }

  ngOnInit() {
    this.recipes = this.recipeSercice.getRecipes();
  }
}
