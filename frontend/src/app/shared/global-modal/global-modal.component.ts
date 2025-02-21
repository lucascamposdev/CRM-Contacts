import { Component, ComponentRef, ViewChild, ViewContainerRef, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-global-modal',
  templateUrl: './global-modal.component.html',
  styleUrls: []
})
export class GlobalModalComponent {
  @ViewChild('modalContent', { read: ViewContainerRef }) modalContent!: ViewContainerRef;
  @Input() title: string = 'Modal';

  constructor(private modalService: NgbModal) {}

  open(modal: any, component: any) {
    this.modalService.open(modal, { centered: true });

    this.modalContent.clear();
    const componentRef: ComponentRef<any> = this.modalContent.createComponent(component);
  }
}
