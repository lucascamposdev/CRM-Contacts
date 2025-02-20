import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: []
})
export class PaginationComponent {

  @Input() hasNext: boolean = false;
  @Input() hasPrevious: boolean = false;

  @Output() nextPage = new EventEmitter<void>();
  @Output() previousPage = new EventEmitter<void>();

  goNext() {
    this.nextPage.emit();
  }

  goPrevious() {
    this.previousPage.emit();
  }
}
