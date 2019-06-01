import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { HeaderComponent } from './Header/Header.component';

import { ShoppingListComponent } from './Shopping-list/Shopping-list.component';
import { ShoppingEditComponent } from './Shopping-list/Shopping-edit/Shopping-edit.component';

import { RecipesComponent } from './Recipes/Recipes.component';
import { RecipeListComponent } from './Recipes/Recipe-list/Recipe-list.component';
import { RecipeDetailsComponent } from './Recipes/Recipe-details/Recipe-details.component';
import { RecipeItemComponent } from './Recipes/Recipe-list/Recipe-item/Recipe-item.component';
import { DropdownDirective } from './shared/dropdown/dropdown.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipesComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipeDetailsComponent,
    DropdownDirective,

  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
