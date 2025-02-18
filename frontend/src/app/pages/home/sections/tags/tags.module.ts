import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreateTagComponent } from './create-tag/create-tag.component';
import { ListTagsComponent } from './list-tags/list-tags.component';
import { TagsComponent } from './tags.component';
import { TagComponent } from 'src/app/shared/tag/tag.component';

@NgModule({
  declarations: [CreateTagComponent, ListTagsComponent, TagsComponent, TagComponent],
  imports: [CommonModule, FormsModule],
  exports: [CreateTagComponent, ListTagsComponent, TagsComponent, TagComponent]
})
export class TagsModule {}
