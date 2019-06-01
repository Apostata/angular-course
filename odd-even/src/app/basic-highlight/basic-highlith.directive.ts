import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector:"[appBasicHighlight]"
})
export class BasicHighlightDirective implements OnInit{
  constructor(private elem: ElementRef){

  }

  ngOnInit(){
    this.elem.nativeElement.style.backgroundColor = 'yellow'
  }
}
