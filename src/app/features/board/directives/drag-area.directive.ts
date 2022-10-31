import { Directive, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[appDragArea]'
})
export class DragAreaDirective{
  @Input() column: string = '';

  @Output() itemDropped = new EventEmitter<string>();

  @HostBinding('class.hover') dragenter = false;

  @HostListener('dragover', ['$event']) onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  @HostListener('dragenter') onDragEnter() {
    this.dragenter = true;
  }

  @HostListener('dragleave') onDragLeave() {
    this.dragenter = false;
  }

  @HostListener('drop') onDragDrop() {
    // emit event to show which column the task was dropped to
    this.itemDropped.emit(this.column);
    this.dragenter = false;
  }

}
