import { Subscription } from 'rxjs/Subscription';
import { OnInit, OnDestroy } from '@angular/core';
import { UserService } from './user/user.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  isActivated: boolean = false;
  usersSubscription: Subscription;
  constructor(private userService: UserService){}

  ngOnInit(){
    this.usersSubscription = this.userService.subject.subscribe((activated)=>{
      this.isActivated = activated;
    });
  }

  ngOnDestroy(){
    this.usersSubscription.unsubscribe();
  }
}
