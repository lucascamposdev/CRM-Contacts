import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Tag } from './tag.service';

export interface Client{
  id: string;
  name: string;
  email: string;
  status: string;
  number: string;
  tags: Tag[]
}

interface ClientResponse {
  count: number;
  next: string;
  previous: string;
  results: Client[]
}

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private apiUrl = `${environment.apiUrl}/clients/`;
  private clientsResponseSubject = new BehaviorSubject<ClientResponse>({
    count: 0,
    next: '',
    previous: '',
    results: []
  });
  clientsResponse$ = this.clientsResponseSubject.asObservable();

  // Loading
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  constructor(private http: HttpClient, private toast: ToastrService) {}

  loadClients(params?: { page?: string, search?: string, order?: string }) {
    let httpParams = new HttpParams();
    this.loadingSubject.next(true);

    const page = params?.page || '1';
    httpParams = httpParams.set('page', page);

    if (params?.search) {
      httpParams = httpParams.set('search', params.search);
    }

    if (params?.order) {
      httpParams = httpParams.set('order', params.order);
    }

    this.http.get<ClientResponse>(this.apiUrl, { params: httpParams }).subscribe({
      next: (res) => {
        this.clientsResponseSubject.next(res);
        this.loadingSubject.next(false);
      },
      error: (err) => {
        this.toast.error('Error loading clients');
        this.loadingSubject.next(false);
      }
    });
  }
}
