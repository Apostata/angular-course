import { Injectable, EventEmitter } from "@angular/core";

@Injectable({providedIn:'root'})
export class UserService {
  activateEmitter : EventEmitter<boolean> = new EventEmitter<boolean>();
}
