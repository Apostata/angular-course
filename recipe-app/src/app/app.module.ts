import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppHeader } from './Header/Header.component';
import { RecipeBook } from './RecipeBook/RecipeBook.component';
import { ShoppingList } from './ShoppingList/ShoppingList.component';

@NgModule({
  declarations: [
    AppComponent,
    AppHeader,
    RecipeBook,
    ShoppingList
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
