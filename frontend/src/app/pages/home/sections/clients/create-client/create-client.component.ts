import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { ClientFormComponent } from '../client-form/client-form.component';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: []
})
export class CreateClientComponent implements OnInit {

  constructor(
    private modalService: ModalService) { }

  ngOnInit(): void {}

  openModal(){
    this.modalService.openModal(ClientFormComponent, null);
  }
}
