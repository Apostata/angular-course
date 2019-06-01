import { Directive, HostListener, HostBinding, Output, EventEmitter, ElementRef, Renderer2 } from '@angular/core';
import { ArrayType } from '@angular/compiler';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.show') isOpen = false;

  @HostListener('document:click', ['$event']) close (event:Event) {
    let elem = this.elem.nativeElement;
    let menu = elem.querySelector('.dropdown-menu');

    let inside: boolean = elem.contains(event.target);
    if(!inside) {
        this.isOpen = false;
        menu.classList.remove('show');
    }
    else{
      (menu.classList.contains('show')) ? menu.classList.remove('show') : menu.classList.add('show');
    }
  }

  constructor(private elem: ElementRef, private renderer: Renderer2){}
}
