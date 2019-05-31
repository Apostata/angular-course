import { Component, OnInit } from '@angular/core';

@Component({
  selector:'app-game-control',
  templateUrl:'./gameControl.component.html',
  styleUrls:['./gameControl.component.css']
})

export class GameControl  implements OnInit{
  interval: any;
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

  }

  startTimer(){

  }

  pauseTimer(){
    
  }
}
