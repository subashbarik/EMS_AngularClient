import { Injectable } from '@angular/core';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { ConfirmDialogComponent } from './components/dialogs/confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  modalRef?: BsModalRef;
  public confirmClosed = new Subject<boolean>();
  constructor(private modalService: BsModalService) {}
  showConfirm() {
    let modalDialogOptions = {
      class: 'modal-dialog-centered',
    };
    this.modalRef = this.modalService.show(
      ConfirmDialogComponent,
      modalDialogOptions
    );
  }
  hideConfirm() {
    this.modalRef.hide();
  }
}
