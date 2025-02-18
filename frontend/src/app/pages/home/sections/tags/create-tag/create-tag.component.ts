import { Component, OnInit } from '@angular/core';
import { TagService } from 'src/app/services/tag.service';

@Component({
  selector: 'app-create-tag',
  templateUrl: './create-tag.component.html',
  styleUrls: []
})
export class CreateTagComponent implements OnInit {

  colors = ['#F1F2F4', '#4BCE97', '#F5CD47', '#FEA362', '#F87168', '#B8ACF6', '#579DFF'];
  selectedColor: string = this.colors[0];
  inputValue: string = '';

  constructor(private tagService: TagService) { }

  ngOnInit(): void {
  }

  selectColor(color: string) {
    this.selectedColor = color;
  }

  handleSubmit() {
    if (!this.inputValue.trim()) return;

    console.log('Selected Color:', this.selectedColor);
    console.log('Input Value:', this.inputValue);

    this.tagService.addTag({ id: 0, name: this.inputValue, color: this.selectedColor });

    this.clearFields();
  }

  clearFields(){
    this.inputValue = ''
    this.selectedColor = this.colors[0];
  }
}
