import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: []
})
export class SearchbarComponent implements OnInit {

  searchQuery: string = '';

  @Output() searchChanged: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {}

  onSearchChange(): void {
    this.searchChanged.emit(this.searchQuery);
  }

}
