import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreateTagComponent } from './create-tag/create-tag.component';
import { ListTagsComponent } from './list-tags/list-tags.component';
import { TagsComponent } from './tags.component';

@NgModule({
  declarations: [CreateTagComponent, ListTagsComponent, TagsComponent],
  imports: [CommonModule, FormsModule],
  exports: [CreateTagComponent, ListTagsComponent, TagsComponent]
})
export class TagsModule {}
