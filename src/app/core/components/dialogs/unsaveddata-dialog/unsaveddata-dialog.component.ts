import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-unsaveddata-dialog',
  templateUrl: './unsaveddata-dialog.component.html',
  styleUrls: ['./unsaveddata-dialog.component.scss'],
})
export class UnsaveddataDialogComponent implements OnInit {
  constructor(private bsModalRef: BsModalRef) {}
  public onClose: Subject<boolean>;
  public ngOnInit(): void {
    this.onClose = new Subject();
  }

  public confirm(): void {
    this.onClose.next(true);
    this.bsModalRef.hide();
  }

  public decline(): void {
    this.onClose.next(false);
    this.bsModalRef.hide();
  }
}
