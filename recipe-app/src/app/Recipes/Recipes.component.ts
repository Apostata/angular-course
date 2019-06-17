import { Input, OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Recipe } from './Recipes.model';
import { RecipesSercive } from './Recipes.service';
import { Subscription } from 'rxjs';
@Component({
  selector: "app-recipes",
  templateUrl: './Recipes.component.html',
  styleUrls: ['./Recipes.component.css']
})
export class RecipesComponent implements OnInit{

  constructor(){}

  ngOnInit(){

  }
}
