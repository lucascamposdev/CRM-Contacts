import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsTableComponent } from './list-clients/clients-table.component';
import { PaginationComponent } from './list-clients/pagination/pagination.component';
import { SearchbarComponent } from './list-clients/searchbar/searchbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientFormComponent } from './client-form/client-form.component';

@NgModule({
  declarations: [ClientsTableComponent, PaginationComponent, SearchbarComponent, ClientFormComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [ClientsTableComponent, PaginationComponent, SearchbarComponent, ClientFormComponent]
})
export class ClientsModule {}

