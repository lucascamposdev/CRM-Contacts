import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-tag',
  templateUrl: './create-tag.component.html',
  styleUrls: []
})
export class CreateTagComponent implements OnInit {

  colors = ['#FF5733', '#33FF57', '#3357FF', '#FFD700', '#8A2BE2'];
  selectedColor: string = this.colors[0];
  inputValue: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  selectColor(color: string) {
    this.selectedColor = color;
  }

  handleSubmit() {
    if (!this.inputValue.trim()) return;

    console.log('Selected Color:', this.selectedColor);
    console.log('Input Value:', this.inputValue);

    this.clearFields();
  }

  clearFields(){
    this.inputValue = ''
    this.selectedColor = this.colors[0];
  }
}
