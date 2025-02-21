import { Component, OnInit } from '@angular/core';
import { Client, ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-clients-table',
  templateUrl: './clients-table.component.html',
  styleUrls: []
})
export class ClientsTableComponent implements OnInit {

  clients: Client[] = [];
  nextPageUrl: string | null = null;
  previousPageUrl: string | null = null;
  searchQuery: string = '';
  order: string = 'alphabetical';
  isLoading: boolean = false;
  
  constructor(private clientService: ClientService) { }

  ngOnInit(): void {
    this.clientService.loading$.subscribe((loading) => {
      this.isLoading = loading;
    });

    this.clientService.clientsResponse$.subscribe(response => {
      this.clients = response.results;
      this.nextPageUrl = response.next;
      this.previousPageUrl = response.previous;
    });

    this.loadClients();
  }

  loadClients(page?: string) {
    this.clientService.loadClients({ page, search: this.searchQuery, order: this.order });
  }

  goToNextPage() {
    if (this.nextPageUrl) {
      const page = new URL(this.nextPageUrl).searchParams.get('page');
      this.loadClients(page ?? '');
    }
  }

  goToPreviousPage() {
    if (this.previousPageUrl) {
      const page = new URL(this.previousPageUrl).searchParams.get('page');
      this.loadClients(page ?? '');
    }
  }

  onSearchChange(query: string) {
    this.searchQuery = query;
    this.loadClients();
  }

  changeOrder(order: string) {
    this.order = order;
    this.loadClients();
  }
}
