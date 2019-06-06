import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};
  allowEdit: boolean;
  constructor(
    private serversService: ServersService,
    private activeRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    const id = Number(this.activeRoute.snapshot['id']);
    this.allowEdit = (this.activeRoute.snapshot.queryParams['allowEdit']== true);
    console.log('init', this.allowEdit)
    this.server = this.serversService.getServer(id);

    this.activeRoute.params.subscribe(
      (params: Params)=>{
        this.server = this.serversService.getServer(Number(params['id']));
      }
    );

    this.activeRoute.queryParams.subscribe(
      (params: Params)=>{
        this.allowEdit = (params['allowEdit'] == true);
      }
    );

  }

  editServer(){
    this.router.navigate(['edit'],{ relativeTo:this.activeRoute, queryParamsHandling:'preserve'})
  }

}
