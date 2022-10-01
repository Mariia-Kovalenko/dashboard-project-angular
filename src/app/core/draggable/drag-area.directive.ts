import { Directive, EventEmitter, HostBinding, HostListener, Input, OnInit, Output } from '@angular/core';

@Directive({
  selector: '[appDragArea]'
})
export class DragAreaDirective implements OnInit{
  @Input() column: string = '';

  @Output() itemDropped = new EventEmitter<string>();

  @HostBinding('class.hover') dragenter = false;

  @HostListener('dragover', ['$event']) onDragOver(event: DragEvent) {
    event.preventDefault();
    // console.log('drag over');
  }

  @HostListener('dragenter') onDragEnter() {
    this.dragenter = true;
    // console.log('drag enter');
  }

  @HostListener('dragleave') onDragLeave() {
    this.dragenter = false;
    // console.log('drag leave');
  }

  @HostListener('drop') onDragDrop() {
    // emit event to show which column the task was dropped to
    this.itemDropped.emit(this.column);
    this.dragenter = false;
    // console.log('drag drop');
  }

  ngOnInit() {
    // console.log(this.column);
  }

}
