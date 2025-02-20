import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsTableComponent } from './list-clients/clients-table.component';
import { PaginationComponent } from './list-clients/pagination/pagination.component';

@NgModule({
  declarations: [ClientsTableComponent, PaginationComponent],
  imports: [CommonModule],
  exports: [ClientsTableComponent, PaginationComponent]
})
export class ClientsModule {}
