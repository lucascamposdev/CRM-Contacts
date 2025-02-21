import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: []
})
export class SearchbarComponent implements OnInit {

  searchQuery: string = '';
  private searchSubject = new Subject<string>();

  @Output() searchChanged: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.searchSubject.pipe(debounceTime(500)).subscribe(query => {
      this.searchChanged.emit(query);
    });
  }

  onSearchChange(): void {
    this.searchSubject.next(this.searchQuery);
  }
}
