import { Component, OnInit } from '@angular/core';
import { DialogService } from 'src/app/core/dialog.service';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent implements OnInit {
  constructor(private dialogService: DialogService) {}

  ngOnInit(): void {}
  confirm(): void {
    this.dialogService.confirmClosed.next(true);
    this.dialogService.hideConfirm();
  }

  decline(): void {
    this.dialogService.confirmClosed.next(false);
    this.dialogService.hideConfirm();
  }
}
