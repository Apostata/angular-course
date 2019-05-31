import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  rota: string = "recipes";


  onNavigate(route: string){
    this.rota = route;
    console.log(this.rota);
  }
}
