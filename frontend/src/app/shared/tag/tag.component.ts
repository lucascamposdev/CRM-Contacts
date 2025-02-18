import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: []
})
export class TagComponent implements OnInit {
  @Input() name!: string;
  @Input() color!: string;
  @Input() customClasses: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
