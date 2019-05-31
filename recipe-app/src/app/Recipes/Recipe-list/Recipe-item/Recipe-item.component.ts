import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Recipe } from '../../Recipes.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './Recipe-item.component.html',
  styleUrls: ['./Recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit{
  name: string = 'RecipeItem';

  @Input('receita') recipe: Recipe;
  @Output() selectedRecipe = new EventEmitter<void>();

  ngOnInit(){

  }

  onSelectRecipe(){
    this.selectedRecipe.emit();
  }
}
