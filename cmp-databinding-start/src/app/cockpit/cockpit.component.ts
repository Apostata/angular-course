import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit {
  newServerName ='';
  newServerContent ='';
  @Output() serverCreated = new EventEmitter<{serverName:string, serverContent:string}>();
  @Output() bluePrintCreated = new EventEmitter<{serverName:string, serverContent:string}>();;

  @ViewChild('serverContentInput') inputContent : ElementRef
  constructor() { }

  ngOnInit() {
  }

  onAddServer(nameInput:string) {
    console.log(nameInput);
    console.log(this.inputContent.nativeElement.value);
    this.serverCreated.emit(
      {
        serverName: nameInput,
        serverContent: this.inputContent.nativeElement.value
      }
    );
  }

  // onAddBlueprint() {
  //   this.bluePrintCreated.emit(
  //     {
  //       serverName: this.newServerName,
  //       serverContent: this.newServerContent
  //     }
  //   )
  // }

}
