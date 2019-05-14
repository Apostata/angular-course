import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  // template: `<p>Dois servidores template inline</p>
  // <app-server></app-server>
  // <app-server></app-server>`,
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  allowNewServer: boolean = false;
  serverCreated: boolean = false;
  serverName: string = "teste";
  servers = ['TestServer', 'TestServer 2'];

  constructor() {
    setTimeout(() => {
      this.allowNewServer = true;
    }, 1500);
  }

  ngOnInit() {
  }

  onCreateServer() : void{
    //this.serverCreationStatus = `Server was created! Name is ${this.serverName}`;
    this.serverCreated = true;
    this.servers.push(this.serverName);
  }

  onUpdateServerName(e : any) : void{
    this.serverName = e.target.value;
  }

}
