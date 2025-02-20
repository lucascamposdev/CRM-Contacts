import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsTableComponent } from './list-clients/clients-table.component';
import { PaginationComponent } from './list-clients/pagination/pagination.component';
import { SearchbarComponent } from './list-clients/searchbar/searchbar.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ClientsTableComponent, PaginationComponent, SearchbarComponent],
  imports: [CommonModule, FormsModule],
  exports: [ClientsTableComponent, PaginationComponent, SearchbarComponent]
})
export class ClientsModule {}
