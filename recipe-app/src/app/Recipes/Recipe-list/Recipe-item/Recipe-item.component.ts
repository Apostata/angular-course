import { Component, OnInit, Input } from "@angular/core";
import { Recipe } from '../../Recipes.model';
import { RecipesSercive } from '../../Recipes.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './Recipe-item.component.html',
  styleUrls: ['./Recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit{
  name: string = 'RecipeItem';

  @Input('receita') recipe: Recipe;
  @Input() index: number;

  constructor(private recipeService: RecipesSercive, private route: Router, private activeRoute: ActivatedRoute){}

  ngOnInit(){

  }

  onSelectRecipe(){
    this.recipeService.selectedRecipe.emit(this.recipe);
    this.route.navigate([`${this.index}`], {relativeTo: this.activeRoute});
  }
}
