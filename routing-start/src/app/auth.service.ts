import { Injectable } from "@angular/core";

export class AuthService {
  loggedIn: boolean = false;

  isAuthenticated(){
    return new Promise(
      (resolve, reject)=>{
        setTimeout(()=>{
          resolve(this.loggedIn);
        },800)
      }
    )
  }

  login(){
    this.loggedIn = true;
  }

  logout(){
    this.loggedIn = false;
  }

  getStatus(){
    return this.loggedIn;
  }
}
