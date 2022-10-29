import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[appChangeBg]'
})
export class ChangeBgDirective {

  @Output() colorChosen = new EventEmitter<{color: string, element: string}>();

  constructor(private elRef: ElementRef) {
  }

  @HostListener('click') onClick() {
    console.log(this.elRef);
    this.colorChosen.emit(
      {
        color: this.elRef.nativeElement.classList[1], 
        element: this.elRef.nativeElement.parentElement.id
      });
  }

}
