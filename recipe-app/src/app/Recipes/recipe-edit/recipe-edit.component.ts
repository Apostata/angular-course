import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { RecipesSercive } from '../Recipes.service';
import { Recipe } from '../Recipes.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode: boolean = false;
  recipe: Recipe;
  constructor(private activeRoute: ActivatedRoute, private recipesService: RecipesSercive) { }

  ngOnInit() {
    this.activeRoute.params.subscribe(
      (param: Params)=>{
        this.id = Number(param.idx);
        this.recipe = this.recipesService.getRecipe(this.id);
        this.editMode = param.idx ? true : false;
      }
    )
  }

}
