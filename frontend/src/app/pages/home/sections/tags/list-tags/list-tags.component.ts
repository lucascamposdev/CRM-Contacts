import { Component, OnInit } from '@angular/core';
import { TagService } from 'src/app/services/tag.service';

@Component({
  selector: 'app-list-tags',
  templateUrl: './list-tags.component.html',
  styleUrls: ['./list-tags.component.css']
})
export class ListTagsComponent implements OnInit {

  tags: any[] = [];

  constructor(private tagService: TagService) { }

  ngOnInit() {
    this.tagService.tags$.subscribe(tags => this.tags = tags);
    this.tagService.loadTags();
  }

  deleteTag(tagId: number) {
    this.tagService.deleteTag(tagId);
  }
}
