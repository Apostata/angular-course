import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appUnless]'
})
export class UnlessDirective {
  @Input() set appUnless(condition: boolean){
    if(!condition){
      this.viewRef.createEmbeddedView(this.templateRef);
    }else{
      this.viewRef.clear()
    }
  } // um setter é executado sempre que a propriedade muda
  constructor(private templateRef:TemplateRef<any>, private viewRef: ViewContainerRef) { }

}
