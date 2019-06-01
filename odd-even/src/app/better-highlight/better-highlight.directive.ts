import { Directive, Renderer2, OnInit, ElementRef, HostListener, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit{
  @Input() defaultColor:string;
  @Input('appBetterHighlight') highlightColor:string = 'blue';

  @HostBinding('style.backgroundColor') bgProp: string;

  ngOnInit(){
    this.bgProp = this.defaultColor;
  }

  @HostListener('mouseenter') onMouseOver(event: Event){
    this.bgProp = this.highlightColor;
  }
  @HostListener('mouseleave') onMouseOut(event: Event){
    this.bgProp = this.defaultColor;
  }


}
