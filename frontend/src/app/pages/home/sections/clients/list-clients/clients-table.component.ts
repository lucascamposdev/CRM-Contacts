import { Component, OnInit } from '@angular/core';
import { Client, ClientService } from 'src/app/services/client.service';
import { ModalService } from 'src/app/services/modal.service';
import { ClientFormComponent } from '../client-form/client-form.component';

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
  order: string = 'newest';
  isLoading: boolean = false;

  constructor(
    private clientService: ClientService,
    private modalService: ModalService) { }

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

  changeOrder(event: Event) {
    this.order = (event.target as HTMLSelectElement).value;
    this.loadClients();
  }

  openModal(client: Client){
    this.modalService.openModal(ClientFormComponent, client);
  }
}
