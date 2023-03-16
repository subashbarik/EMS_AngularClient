import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { DialogService } from 'src/app/core/dialog.service';
import { IEmployee } from 'src/app/shared/models/employee';
import { deleteEmployee } from 'src/app/state/employee/employee.actions';

@Component({
  selector: 'app-employee-card',
  templateUrl: './employee-card.component.html',
  styleUrls: ['./employee-card.component.scss'],
})
export class EmployeeCardComponent implements OnInit, OnDestroy {
  @Input() employee: IEmployee;
  public confirmSubscription = new Subscription();
  constructor(
    private store: Store,
    private dialogService: DialogService,
    private router: Router
  ) {}

  ngOnInit(): void {}
  ngOnDestroy(): void {
    this.confirmSubscription.unsubscribe();
  }
  delete() {
    this.dialogService.showConfirm();
    this.confirmSubscription = this.dialogService.confirmClosed.subscribe({
      next: (response: boolean) => {
        if (response) {
          this.store.dispatch(deleteEmployee({ employee: this.employee }));
        }
      },
    });
  }
  view(id): void {
    this.router.navigate(['/main/employees/details/' + id]);
  }
}
