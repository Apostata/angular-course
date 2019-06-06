import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit {
  server: {id: number, name: string, status: string};
  name: string;
  status: string;
  allowEdit: boolean = false;

  constructor(
    private serversService: ServersService,
    private route: Router,
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
        console.log(this.allowEdit);
      }
    )
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.name, status: this.status});
  }
}
