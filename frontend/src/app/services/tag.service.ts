import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

export interface Tag {
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

  constructor(private http: HttpClient, private toast: ToastrService) {}

  loadTags() {
    this.http.get<Tag[]>(this.apiUrl).subscribe(tags => {
      this.tagsSubject.next(tags);
    });
  }

  addTag(tag: Tag) {
    this.http.post<Tag>(this.apiUrl, tag).subscribe({
      next: (newTag) => {
        const updatedTags = [...this.tagsSubject.value, newTag];
        this.tagsSubject.next(updatedTags);
        this.toast.success('Tag created succesfully!');
      },
      error: (error) => {
        const errorMessage = error?.error?.name || 'error creating tag';
        this.toast.error(errorMessage);
      }
    });
  }

  deleteTag(tagId: number) {
    this.http.delete(`${this.apiUrl}${tagId}/`).subscribe({
      next: () => {
        const updatedTags = this.tagsSubject.value.filter(tag => tag.id !== tagId);
        this.tagsSubject.next(updatedTags);
      },
      error: (error) =>{
        const errorMessage = error?.error?.name || 'error deleting tag';
        this.toast.error(errorMessage);
      }
    });
  }
}
