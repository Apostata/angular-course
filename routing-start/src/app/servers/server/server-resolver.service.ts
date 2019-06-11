import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { ServersService } from '../servers.service';

export interface Server {
  id:number,
  name:string,
  status:string
}

@Injectable()
export class ServerResolver implements Resolve<Server> {
  constructor(private serversService: ServersService){}

  resolve(activateRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot)
  : Observable<Server> | Promise<Server> | Server {
    return this.serversService.getServer(Number(activateRoute.params.id));
  }
}
