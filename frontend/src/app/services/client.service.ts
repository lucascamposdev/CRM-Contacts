import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Tag } from './tag.service';
import { FormGroup } from '@angular/forms';

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

  // Response Object
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

  updateClient(client: Client, id: string) {
    this.http.put<Client>(`${this.apiUrl}${id}/`, client).subscribe({
      next: (updatedClient) => {
        const currentResponse = this.clientsResponseSubject.value;

        const updatedResults = currentResponse.results.map(c =>
          c.id === id ? updatedClient : c
        );

        this.clientsResponseSubject.next({
          ...currentResponse,
          results: updatedResults
        });

        this.toast.success('Client updated successfully!');
      },
      error: (error) => {
        const errorMessage = error?.error?.name || 'Error updating client';
        console.log(error);
        this.toast.error(errorMessage);
      }
    });
  }

  createClient(client: Client) {
    this.http.post<Client>(this.apiUrl, client).subscribe({
      next: (newClient) => {
        const currentResponse = this.clientsResponseSubject.value;

        const updatedResults = [newClient, ...currentResponse.results];

        this.clientsResponseSubject.next({
          ...currentResponse,
          count: currentResponse.count + 1,
          results: updatedResults
        });

        this.toast.success('Client created successfully!');
      },
      error: (error) => {
        const errorMessage = error?.error?.name || 'Error creating client';
        console.log(error);
        this.toast.error(errorMessage);
      }
    });
  }

  deleteClient(id: string) {
    this.http.delete(`${this.apiUrl}${id}/`).subscribe({
      next: () => {
        const currentResponse = this.clientsResponseSubject.value;

        const updatedResults = currentResponse.results.filter(c => c.id !== id);

        this.clientsResponseSubject.next({
          ...currentResponse,
          count: currentResponse.count - 1,
          results: updatedResults
        });

        this.toast.success('Client deleted successfully!');
      },
      error: (error) => {
        const errorMessage = error?.error?.detail || 'Error deleting client';
        console.log(error);
        this.toast.error(errorMessage);
      }
    });
  }
}
