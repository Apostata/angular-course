import { CanComponentDeactivate } from './can-deactivated-guard.service';
import { Component, OnInit } from '@angular/core';
import { ServersService } from '../servers.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  server: {id: number, name: string, status: string};
  name: string;
  status: string;
  allowEdit: boolean = false;
  changesSaved: boolean = false;

  constructor(
    private serversService: ServersService,
    private router: Router,
    private activeRoute : ActivatedRoute,
  ) { }

  ngOnInit() {
    const id = Number(this.activeRoute.snapshot.params['id']);
    this.allowEdit = (this.activeRoute.snapshot.queryParams['allowEdit'] == true);
    this.server = this.serversService.getServer(id);
    this.name = this.server.name;
    this.status = this.server.status;

    this.activeRoute.queryParams.subscribe(
      (params: Params)=>{
        this.allowEdit = (params['allowEdit'] == true);
      }
    )
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.name, status: this.status});
    this.changesSaved = true;
    this.router.navigate(['../'], {relativeTo: this.activeRoute, queryParams:{allowEdit: this.activeRoute.snapshot.queryParams['allowEdit']}})
  }

  canDectivate(): Observable<boolean> | Promise<boolean> | boolean {
    if(!this.allowEdit){
      return true;
    }
    if((this.name !== this.server.name || this.status !== this.server.status) && !this.changesSaved){
      return confirm('Você deseja descartar as mudanças Realizadas?');
    }
    else{
      return true;
    }
  }
}
