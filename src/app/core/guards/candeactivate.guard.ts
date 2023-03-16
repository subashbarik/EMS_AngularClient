import { Injectable } from '@angular/core';

import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  RouterStateSnapshot,
} from '@angular/router';
import { map, Observable } from 'rxjs';
import { ComponentCanDeactivate } from 'src/app/shared/models/candeactivate';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { UnsaveddataDialogComponent } from '../components/dialogs/unsaveddata-dialog/unsaveddata-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class CandeactivateGuard
  implements CanDeactivate<ComponentCanDeactivate>
{
  modalRef: BsModalRef;
  constructor(private modalService: BsModalService) {}
  canDeactivate(
    component: ComponentCanDeactivate,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): boolean | Observable<boolean> {
    let output: boolean;
    if (component.canDeactivate()) {
      return true;
    } else {
      return this.openConfirmDialog();
    }
  }
  openConfirmDialog() {
    let modalDialogOptions = {
      class: 'modal-dialog-centered',
    };
    this.modalRef = this.modalService.show(
      UnsaveddataDialogComponent,
      modalDialogOptions
    );
    return this.modalRef.content.onClose.asObservable();
  }
}
