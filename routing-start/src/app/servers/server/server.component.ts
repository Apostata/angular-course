import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Params, Router, Data } from '@angular/router';
import { Server } from './server-resolver.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: Server;
  allowEdit: boolean;
  constructor(
    private serversService: ServersService,
    private activeRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.activeRoute.data.subscribe((data:Data)=>{
      console.log(data);
      this.server = data['server'];
    });
  }

  editServer(){
    this.router.navigate(['edit'],{ relativeTo:this.activeRoute, queryParamsHandling:'preserve'})
  }

}
