import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  status: string;
  constructor(private router: Router, private authService:AuthService) { }

  ngOnInit() {
  }

  loadServers(){
    // something mora tha load route
    this.router.navigate(['/servers'])
  }

  logIn(){
    this.authService.login();
  }

  logOut(){
    this.authService.logout();
    this.status = this.authService.getStatus()? 'Logged' : 'Not Logged' ;
  }

}
