import { Component, OnDestroy, OnInit } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { combineLatest, map, Observable, Subscription } from 'rxjs';
import { EmployeeParams } from '../shared/models/employeeParams';

import {
  deleteEmployeeSuccess,
  loadEmployees,
  loadEmployeesSuccess,
  resetEmployeeParams,
  setEmployeeParams,
} from '../state/employee/employee.actions';
import {
  employeeActionStatus,
  selectAllEmployees,
  selectEmployeeCount,
  selectEmployeeParams,
} from '../state/employee/employee.selectors';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
})
export class EmployeeListComponent implements OnInit, OnDestroy {
  public empCount: number;
  public empDeleteStatusSubscription = new Subscription();
  public employees$ = this.store.select(selectAllEmployees);
  public empLoadingStatus$ = this.store.select(employeeActionStatus);
  public empParams$ = this.store.select(selectEmployeeParams);
  public empCount$ = this.store.select(selectEmployeeCount);
  public vm$ = combineLatest([
    this.employees$,
    this.empLoadingStatus$,
    this.empParams$,
    this.empCount$,
  ]).pipe(
    map(([employees, loadingStatus, empParams, count]) => ({
      employees,
      loadingStatus,
      empParams,
      count,
    }))
  );

  constructor(
    private store: Store,
    private actions: Actions,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.store.dispatch(loadEmployees());

    //subscribe to the deleteEmployeeSuccess action
    // if delete is success then refresh the page
    this.empDeleteStatusSubscription = this.actions
      .pipe(ofType(deleteEmployeeSuccess))
      .subscribe({
        next: (response) => {
          //reload data after delete
          this.store.dispatch(loadEmployees());
          this.toastrService.success('Employee deleted successfully.');
        },
        error: (error) => {
          this.toastrService.error('Problem deleting employee.');
        },
      });
  }
  onPageChanged(pageNumer: number) {
    let empParams = new EmployeeParams();
    empParams.pageIndex = pageNumer;
    this.store.dispatch(setEmployeeParams({ params: empParams }));
    this.store.dispatch(loadEmployees());
  }
  ngOnDestroy(): void {
    this.store.dispatch(resetEmployeeParams());
    this.empDeleteStatusSubscription.unsubscribe();
  }
}
