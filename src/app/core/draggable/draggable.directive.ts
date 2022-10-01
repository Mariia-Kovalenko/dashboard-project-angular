import { Directive, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[appDraggable]'
})
export class DraggableDirective {

  constructor() { }
  @HostBinding('class.hide') dragging = false;

  @Input() name!: string;

  @Output() itemDragged = new EventEmitter();

  @HostListener('dragstart') onDragStart() {
    // emit event to define which task is being dragged
    this.itemDragged.emit(this.name)
    setTimeout(() => {
      this.dragging = true;
    }, 0);
    console.log('drag start');
  }

  @HostListener('dragend') onDragEnd() {
    setTimeout(() => {
      this.dragging = false;
    }, 0);
    console.log('drag end');
  }
}
