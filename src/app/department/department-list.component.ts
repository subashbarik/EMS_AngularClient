import { Component, OnDestroy, OnInit } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { combineLatest, map, Subscription } from 'rxjs';
import { CoreService } from '../core/core.service';

import { DialogService } from '../core/dialog.service';
import { IDepartment } from '../shared/models/department';
import { IServerAppConfiguration } from '../shared/models/serverappconfiguration';
import {
  deleteDepartment,
  deleteDepartmentSuccess,
  loadDepartments,
} from '../state/department/department.actions';
import {
  departmentActionStatus,
  selectAllDepartments,
  selectDepartment,
} from '../state/department/department.selectors';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.scss'],
})
export class DepartmentListComponent implements OnInit, OnDestroy {
  public serverAppConfig: IServerAppConfiguration;
  public departments$ = this.store.select(selectAllDepartments);
  public departmentLoadingStatus$ = this.store.select(departmentActionStatus);

  public department: IDepartment;
  public vm$ = combineLatest([
    this.departments$,
    this.departmentLoadingStatus$,
  ]).pipe(
    map(([departments, loadingStatus]) => ({
      departments,
      loadingStatus,
    }))
  );

  public confirmDialogSubscription = new Subscription();
  public deptDeleteStatusSubscription = new Subscription();

  constructor(
    private store: Store,
    private dialogService: DialogService,
    private toastrService: ToastrService,
    private actions: Actions,
    private coreService: CoreService
  ) {}
  ngOnDestroy(): void {
    this.confirmDialogSubscription.unsubscribe();
    this.deptDeleteStatusSubscription.unsubscribe();
  }
  ngOnInit(): void {
    this.getServerConfiguration();
    this.store.dispatch(loadDepartments());
    //subscribe to the deleteDepartmentSuccess action
    // if delete is success then refresh the page
    this.deptDeleteStatusSubscription = this.actions
      .pipe(ofType(deleteDepartmentSuccess))
      .subscribe({
        next: (response) => {
          //reload data after delete
          this.store.dispatch(loadDepartments());
          this.toastrService.success('Department deleted successfully.');
        },
        error: (error) => {
          this.toastrService.error('Problem deleting department.');
        },
      });
  }
  getServerConfiguration() {
    this.serverAppConfig = this.coreService.serverAppConfig;
  }
  delete(id: number) {
    this.dialogService.showConfirm();
    this.confirmDialogSubscription = this.dialogService.confirmClosed.subscribe(
      {
        next: (response: boolean) => {
          if (response) {
            this.store.select(selectDepartment(id)).subscribe({
              next: (response: IDepartment) => {
                this.department = response;
              },
            });
            this.store.dispatch(
              deleteDepartment({ department: this.department })
            );
          }
        },
      }
    );
  }
}
