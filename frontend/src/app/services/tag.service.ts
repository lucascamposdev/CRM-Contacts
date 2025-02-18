import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

interface Tag {
  id: number;
  name: string;
  color: string;
}

@Injectable({
  providedIn: 'root'
})
export class TagService {

  private apiUrl = `${environment.apiUrl}/tags/`;
  private tagsSubject = new BehaviorSubject<Tag[]>([]);
  tags$ = this.tagsSubject.asObservable();

  constructor(private http: HttpClient) {}

  // Método para carregar as tags iniciais
  loadTags() {
    this.http.get<Tag[]>(this.apiUrl).subscribe(tags => {
      this.tagsSubject.next(tags);
    });
  }

  // Método para adicionar uma nova tag
  addTag(tag: Tag) {
    return this.http.post<Tag>(this.apiUrl, tag).subscribe(newTag => {
      const updatedTags = [...this.tagsSubject.value, newTag];
      this.tagsSubject.next(updatedTags);
    });
  }

  deleteTag(tagId: number) {
    this.http.delete(`${this.apiUrl}${tagId}/`).subscribe(() => {
      const updatedTags = this.tagsSubject.value.filter(tag => tag.id !== tagId);
      this.tagsSubject.next(updatedTags);
    });
  }
}
