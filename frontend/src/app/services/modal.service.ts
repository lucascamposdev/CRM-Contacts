import { Injectable, ComponentRef } from '@angular/core';
import { GlobalModalComponent } from '../shared/global-modal/global-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  constructor(private modalService: NgbModal) {}

  openModal(component: any, data: any) {
    const modalRef = this.modalService.open(component, { centered: true });
    modalRef.componentInstance.data = data;
  }
}
